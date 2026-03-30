# Strapi Blog API Setup

This project now includes a blog-oriented content model for Strapi v5 under `src/api` and reusable components under `src/components`.

## Added Folder Structure

```text
src/
  api/
    author/
      content-types/author/schema.json
      controllers/author.ts
      routes/author.ts
      services/author.ts
    blog/
      content-types/blog/schema.json
      controllers/blog.ts
      routes/blog.ts
      routes/custom-blog.ts
      services/blog.ts
    category/
      content-types/category/schema.json
      controllers/category.ts
      routes/category.ts
      services/category.ts
    tag/
      content-types/tag/schema.json
      controllers/tag.ts
      routes/tag.ts
      services/tag.ts
  components/
    blog/
      heading.json
      paragraph.json
      list-item.json
      list.json
      image.json
      table-of-contents-item.json
    shared/
      seo.json
```

## Content Types

### Blog

- `title`: string, required
- `slug`: uid, unique, generated from title
- `description`: text
- `coverImage`: single media image
- `content`: dynamic zone using `blog.heading`, `blog.paragraph`, `blog.list`, `blog.image`
- `tableOfContents`: repeatable component `blog.table-of-contents-item`
- `author`: many-to-one relation to `Author`
- `publishDate`: datetime
- `viewsCount`: integer with default `0`
- `categories`: many-to-many relation to `Category`
- `tags`: many-to-many relation to `Tag`
- `seo`: reusable `shared.seo` component
- `popularArticles`: self relation for sidebar/promoted content
- `relatedBlogs`: self relation for related articles/sidebar
- Built-in Strapi metadata: `documentId`, `createdAt`, `updatedAt`, `publishedAt`

### Author

- `name`
- `slug`
- `designation`
- `bio`
- `avatar`
- reverse relation `blogs`

### Category

- `name`
- `slug`
- `description`
- reverse relation `blogs`

### Tag

- `name`
- `slug`
- reverse relation `blogs`

## Components

### `blog.heading`

Use for section headings and anchor IDs that match the table of contents.

```json
{
  "title": "Traditional ERP Systems Are No Longer Enough",
  "level": "h2",
  "anchorId": "traditional-erp-systems"
}
```

### `blog.paragraph`

Use for narrative content paragraphs.

```json
{
  "body": "Traditional ERP systems require manual updates and provide delayed visibility across production, procurement, and planning."
}
```

### `blog.list`

Use for bullet, numbered, or checklist items.

```json
{
  "title": "AI advantages",
  "style": "bullet",
  "items": [
    { "text": "Demand forecasting" },
    { "text": "Inventory optimization" }
  ]
}
```

### `blog.image`

Use for inline visuals between sections.

```json
{
  "altText": "ERP dashboard with production metrics",
  "caption": "AI-assisted ERP dashboard",
  "image": null
}
```

## API Endpoints

Strapi will expose the standard collection endpoints automatically.

### Standard CRUD

- `POST /api/blogs`
- `GET /api/blogs`
- `GET /api/blogs/:documentId`
- `PUT /api/blogs/:documentId`
- `DELETE /api/blogs/:documentId`

### Slug Route

- `GET /api/blogs/slug/:slug`

This project includes a custom controller action that resolves a blog by its slug and returns the first match.

### Useful Query Examples

- `GET /api/blogs?populate=*`
- `GET /api/blogs?filters[slug][$eq]=why-every-manufacturing-company-needs-an-ai-integrated-erp-system&populate=*`
- `GET /api/blogs/slug/why-every-manufacturing-company-needs-an-ai-integrated-erp-system?populate=*`
- `GET /api/blogs?sort[0]=publishDate:desc&pagination[page]=1&pagination[pageSize]=10`

## Example Create Request

Use your real media IDs and related entry identifiers from your environment.

```http
POST /api/blogs
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
  "data": {
    "title": "Why Every Manufacturing Company Needs an AI-Integrated ERP System",
    "slug": "why-every-manufacturing-company-needs-an-ai-integrated-erp-system",
    "description": "A practical look at how AI-enabled ERP improves forecasting, quality, and supply chain visibility in manufacturing.",
    "publishDate": "2026-03-30T06:30:00.000Z",
    "viewsCount": 0,
    "coverImage": 1,
    "author": "AUTHOR_DOCUMENT_ID",
    "categories": ["CATEGORY_DOCUMENT_ID"],
    "tags": ["TAG_AI_DOCUMENT_ID", "TAG_ERP_DOCUMENT_ID", "TAG_MANUFACTURING_DOCUMENT_ID"],
    "tableOfContents": [
      {
        "title": "Traditional ERP Systems Are No Longer Enough",
        "anchorId": "traditional-erp-systems",
        "level": 2
      },
      {
        "title": "Smarter Demand Forecasting & Inventory Optimization",
        "anchorId": "smarter-demand-forecasting",
        "level": 2
      }
    ],
    "content": [
      {
        "__component": "blog.paragraph",
        "body": "In today's competitive manufacturing landscape, AI-enhanced ERP platforms help unify operations, forecasting, and production planning."
      },
      {
        "__component": "blog.heading",
        "title": "Traditional ERP Systems Are No Longer Enough",
        "level": "h2",
        "anchorId": "traditional-erp-systems"
      },
      {
        "__component": "blog.paragraph",
        "body": "Legacy ERP platforms often struggle with fast-changing demand patterns and fragmented operational data."
      },
      {
        "__component": "blog.list",
        "title": "What AI adds",
        "style": "bullet",
        "items": [
          { "text": "Predictive inventory planning" },
          { "text": "Proactive quality control" },
          { "text": "Real-time operational insights" }
        ]
      }
    ],
    "seo": {
      "metaTitle": "AI ERP for Manufacturing: Benefits, Use Cases, and ROI",
      "metaDescription": "Learn how AI-integrated ERP helps manufacturers improve forecasting, quality, and end-to-end visibility.",
      "metaKeywords": "AI ERP, manufacturing ERP, predictive maintenance, demand forecasting, smart factory",
      "canonicalURL": "https://example.com/blog/why-every-manufacturing-company-needs-an-ai-integrated-erp-system",
      "noIndex": false,
      "noFollow": false
    },
    "popularArticles": ["POPULAR_BLOG_DOCUMENT_ID"],
    "relatedBlogs": ["RELATED_BLOG_DOCUMENT_ID_1", "RELATED_BLOG_DOCUMENT_ID_2"]
  }
}
```

## Example Single Blog Response

Example shape for `GET /api/blogs/slug/:slug?populate=*`:

```json
{
  "data": {
    "id": 1,
    "documentId": "w0xk7sv1y1gdrtv3v94z3h3m",
    "title": "Why Every Manufacturing Company Needs an AI-Integrated ERP System",
    "slug": "why-every-manufacturing-company-needs-an-ai-integrated-erp-system",
    "description": "A practical look at how AI-enabled ERP improves forecasting, quality, and supply chain visibility in manufacturing.",
    "publishDate": "2026-03-30T06:30:00.000Z",
    "viewsCount": 128,
    "createdAt": "2026-03-30T06:40:00.000Z",
    "updatedAt": "2026-03-30T07:15:00.000Z",
    "publishedAt": "2026-03-30T07:16:00.000Z",
    "author": {
      "id": 2,
      "documentId": "p69m0vr2b8f7n2sq8k2dbw6g",
      "name": "Aniket Sharma",
      "designation": "ERP Strategy Consultant"
    },
    "categories": [
      {
        "id": 3,
        "documentId": "v0wzcrfgfbe0flzi3k6sv0h7",
        "name": "Manufacturing"
      }
    ],
    "tags": [
      {
        "id": 4,
        "documentId": "g4xwdy5j8m0r6y0z2c2n1k7l",
        "name": "AI"
      },
      {
        "id": 5,
        "documentId": "h5yzea6k9n1s7z1a3d3o2l8m",
        "name": "ERP"
      }
    ],
    "tableOfContents": [
      {
        "id": 1,
        "title": "Traditional ERP Systems Are No Longer Enough",
        "anchorId": "traditional-erp-systems",
        "level": 2
      }
    ],
    "content": [
      {
        "__component": "blog.paragraph",
        "id": 1,
        "body": "In today's competitive manufacturing landscape..."
      }
    ]
  },
  "meta": {
    "matchedBy": "slug"
  }
}
```

## Admin Panel Steps

If you prefer creating this manually in the Strapi Admin UI instead of code:

1. Open Strapi Admin at `http://localhost:1337/admin`.
2. Go to Content-Type Builder.
3. Create collection type `Blog`.
4. Add fields:
   - Text: `title`
   - UID: `slug`, attached to `title`
   - Rich text or Dynamic Zone: use Dynamic Zone for `content`
   - Textarea: `description`
   - Media: `coverImage`
   - Component repeatable: `tableOfContents`
   - Relation: `author`
   - Datetime: `publishDate`
   - Number: `viewsCount`
   - Relations: `categories`, `tags`, `popularArticles`, `relatedBlogs`
   - Component: `seo`
5. Create collection types `Author`, `Category`, and `Tag`.
6. Create components:
   - `blog.heading`
   - `blog.paragraph`
   - `blog.list-item`
   - `blog.list`
   - `blog.image`
   - `blog.table-of-contents-item`
   - `shared.seo`
7. Save and let Strapi restart.
8. Go to Settings > Users & Permissions Plugin > Roles.
9. For the `Public` role, enable only the read endpoints you want:
   - `find`
   - `findOne`
   - custom `findBySlug` if you want slug-based public access
10. For authenticated content management or custom clients, create an API token in Settings > API Tokens.

## Slug-Based Routing Support

### Backend

- `slug` is a Strapi `uid` field, so it can be auto-generated from `title`.
- Custom route added: `GET /api/blogs/slug/:slug`

### Frontend

Suggested route pattern in a Next.js frontend:

```text
/blog/[slug]
```

Example fetch:

```ts
const res = await fetch(
  `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/slug/${slug}?populate=*`,
  { next: { revalidate: 300 } }
);
```

## Best Practices

### SEO

- Keep `slug` short, readable, and stable after publish.
- Fill `seo.metaTitle` and `seo.metaDescription` for every article.
- Store canonical URLs when the same article may appear in multiple sections.
- Use cover/OG images sized for social previews.

### Dynamic Content Rendering

- Render the dynamic zone by switching on `__component`.
- Use `heading.anchorId` values to generate in-page links and match the table of contents.
- Keep TOC synced with heading sections. If your frontend already parses headings, you can treat `tableOfContents` as an editor override instead of a required source of truth.

### Performance

- Avoid `populate=*` in list endpoints for production listing pages. Populate only the fields you need.
- Paginate blog listings and sort by `publishDate`.
- Cache slug pages at the frontend layer.
- Use thumbnail formats from the upload plugin for sidebar cards and list pages.
- Increment `viewsCount` through a dedicated endpoint or server-side job instead of on every client render.

## Notes

- `updatedAt` is already managed automatically by Strapi and is the recommended source for the “Updated Date” shown in the UI.
- If you want `viewsCount` to auto-increment through a custom endpoint, that can be added next as a small follow-up.
