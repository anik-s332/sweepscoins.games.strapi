import type { Schema, Struct } from '@strapi/strapi';

export interface BlogHeading extends Struct.ComponentSchema {
  collectionName: 'components_blog_headings';
  info: {
    description: 'A heading block for blog content sections';
    displayName: 'Heading';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    level: Schema.Attribute.Enumeration<['h2', 'h3', 'h4']> &
      Schema.Attribute.DefaultTo<'h2'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlogImage extends Struct.ComponentSchema {
  collectionName: 'components_blog_images';
  info: {
    description: 'A content image block with caption and alt text';
    displayName: 'Image';
  };
  attributes: {
    altText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface BlogList extends Struct.ComponentSchema {
  collectionName: 'components_blog_lists';
  info: {
    description: 'A reusable list block for blog content';
    displayName: 'List';
  };
  attributes: {
    items: Schema.Attribute.Component<'blog.list-item', true>;
    style: Schema.Attribute.Enumeration<['bullet', 'numbered', 'checklist']> &
      Schema.Attribute.DefaultTo<'bullet'>;
    title: Schema.Attribute.String;
  };
}

export interface BlogListItem extends Struct.ComponentSchema {
  collectionName: 'components_blog_list_items';
  info: {
    description: 'A single list item in a blog list section';
    displayName: 'List Item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlogParagraph extends Struct.ComponentSchema {
  collectionName: 'components_blog_paragraphs';
  info: {
    description: 'A rich text paragraph block';
    displayName: 'Paragraph';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BlogTableOfContentsItem extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_of_contents_items';
  info: {
    description: 'A single table of contents item for blog navigation';
    displayName: 'Table Of Contents Item';
  };
  attributes: {
    anchorId: Schema.Attribute.String & Schema.Attribute.Required;
    level: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<2>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Reusable SEO metadata';
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaKeywords: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    noFollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.heading': BlogHeading;
      'blog.image': BlogImage;
      'blog.list': BlogList;
      'blog.list-item': BlogListItem;
      'blog.paragraph': BlogParagraph;
      'blog.table-of-contents-item': BlogTableOfContentsItem;
      'shared.seo': SharedSeo;
    }
  }
}
