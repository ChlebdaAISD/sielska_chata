import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist/public')
const serverDistPath = path.resolve(__dirname, '../dist/server')

function updateMetaTags(html, meta) {
  let result = html

  // Title
  result = result.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)

  // Meta description
  result = result.replace(
    /<meta name="description" content=".*?".*?\/>/,
    `<meta name="description" content="${meta.description}" />`
  )

  // Canonical — handle both noscript-wrapped and plain variants
  const canonicalPatterns = [
    /<noscript>\s*<link rel="canonical" href=".*?".*?\/>\s*<\/noscript>/,
    /<link rel="canonical" href=".*?".*?\/>/,
  ]
  let replaced = false
  for (const pattern of canonicalPatterns) {
    if (!replaced && pattern.test(result)) {
      result = result.replace(pattern, `<link rel="canonical" href="${meta.canonical}" />`)
      replaced = true
    }
  }
  if (!replaced) {
    // Inject before </head>
    result = result.replace('</head>', `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`)
  }

  // Open Graph
  result = result.replace(/<meta property="og:title" content=".*?".*?\/>/, `<meta property="og:title" content="${meta.title}" />`)
  result = result.replace(/<meta property="og:description" content=".*?".*?\/>/, `<meta property="og:description" content="${meta.description}" />`)
  result = result.replace(/<meta property="og:url" content=".*?".*?\/>/, `<meta property="og:url" content="${meta.canonical}" />`)

  // Twitter
  result = result.replace(/<meta name="twitter:title" content=".*?".*?\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
  result = result.replace(/<meta name="twitter:description" content=".*?".*?\/>/, `<meta name="twitter:description" content="${meta.description}" />`)

  return result
}

async function prerender() {
  console.log('Starting SSR prerendering...')

  const templatePath = path.join(distPath, 'index.html')
  const serverEntryPath = path.join(serverDistPath, 'entry-server.js')

  if (!fs.existsSync(templatePath)) {
    console.error('Template not found at', templatePath, '— run "npm run build:client" first.')
    process.exit(1)
  }

  if (!fs.existsSync(serverEntryPath)) {
    console.error('Server entry not found at', serverEntryPath, '— run "npm run build:ssr" first.')
    process.exit(1)
  }

  const template = fs.readFileSync(templatePath, 'utf-8')
  const { render, getRoutes } = await import(serverEntryPath)
  const routes = getRoutes()

  for (const routePath of routes) {
    console.log(`  Prerendering: ${routePath}`)

    const { html: appHtml, meta } = render(routePath)
    let fullHtml = updateMetaTags(template, meta)

    // Inject rendered React tree
    fullHtml = fullHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )

    if (routePath === '/') {
      fs.writeFileSync(path.join(distPath, 'index.html'), fullHtml)
      console.log(`    → dist/public/index.html`)
    } else {
      const dirName = routePath.replace(/^\/|\/$/g, '') // strip leading/trailing slash
      const dirPath = path.join(distPath, dirName)
      fs.mkdirSync(dirPath, { recursive: true })
      fs.writeFileSync(path.join(dirPath, 'index.html'), fullHtml)
      console.log(`    → dist/public/${dirName}/index.html`)
    }
  }

  console.log('\nPrerendering complete!')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
