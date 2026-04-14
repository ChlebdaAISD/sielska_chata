import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist/public')
const serverDistPath = path.resolve(__dirname, '../dist/server')

function updateMetaTags(html, meta) {
  let result = html

  // Title
  result = result.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)

  // Meta description - handles newlines and varying whitespace
  result = result.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`
  )

  // Meta keywords
  if (meta.keywords) {
    result = result.replace(
      /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="keywords" content="${meta.keywords}" />`
    )
  }

  // Canonical — handle both noscript-wrapped and plain variants
  const canonicalPatterns = [
    /<noscript>\s*<link rel="canonical" href="[\s\S]*?"\s*\/?>\s*<\/noscript>/,
    /<link rel="canonical" href="[\s\S]*?"\s*\/?>/,
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
  result = result.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`)
  result = result.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`)
  result = result.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:url" content="${meta.canonical}" />`)

  // Twitter
  result = result.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:title" content="${meta.title}" />`)
  result = result.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:description" content="${meta.description}" />`)

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

    // Inject BreadcrumbList JSON-LD for non-root routes
    if (meta.breadcrumb && meta.breadcrumb.length > 0) {
      const breadcrumbSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: meta.breadcrumb.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      })
      fullHtml = fullHtml.replace('</head>', `  <script type="application/ld+json">${breadcrumbSchema}</script>\n  </head>`)
    }

    // Inject any additional route-specific JSON-LD schema
    if (meta.additionalSchema) {
      const additionalSchemaStr = JSON.stringify(meta.additionalSchema)
      fullHtml = fullHtml.replace('</head>', `  <script type="application/ld+json">${additionalSchemaStr}</script>\n  </head>`)
    }

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
