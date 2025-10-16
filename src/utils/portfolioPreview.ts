/**
 * Generate custom HTML content for GLightbox portfolio previews
 * Based on portfolio item contentType
 */

interface PortfolioLink {
  label: string;
  url: string;
  icon?: string;
}

interface PreviewOptions {
  title: string;
  description: string;
  image: string;
  contentType: 'simple' | 'case-study' | 'external' | 'iframe';
  caseStudyUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
  iframeUrl?: string;
  links?: PortfolioLink[];
}

/**
 * Generate HTML for portfolio preview card
 */
export function generatePreviewHTML(options: PreviewOptions): string {
  const {
    title,
    description,
    image,
    contentType,
    caseStudyUrl,
    externalUrl,
    externalLabel,
    iframeUrl,
    links = []
  } = options;

  // For iframe type, return just the iframe
  if (contentType === 'iframe' && iframeUrl) {
    return `
      <div class="glightbox-preview-iframe">
        <iframe src="${iframeUrl}" frameborder="0" class="w-full h-full"></iframe>
      </div>
    `;
  }

  // Generate action button based on content type
  let actionButton = '';
  if (contentType === 'case-study' && caseStudyUrl) {
    actionButton = `
      <a href="${caseStudyUrl}" class="btn-primary" target="_blank">
        Read Full Case Study
        <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    `;
  } else if (contentType === 'external' && externalUrl) {
    actionButton = `
      <a href="${externalUrl}" class="btn-primary" target="_blank" rel="noopener noreferrer">
        ${externalLabel || 'View Project'}
        <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    `;
  }

  // Generate social/external links
  let socialLinks = '';
  if (links.length > 0) {
    const linkItems = links.map(link => `
      <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
        ${link.icon ? `<span class="icon-${link.icon}"></span>` : ''}
        ${link.label}
      </a>
    `).join('');

    socialLinks = `
      <div class="preview-social-links">
        ${linkItems}
      </div>
    `;
  }

  // Return complete preview card HTML
  return `
    <div class="glightbox-preview-card">
      <div class="preview-image-container">
        <img src="${image}" alt="${title}" class="preview-image" />
      </div>
      <div class="preview-details">
        <h2 class="preview-title">${title}</h2>
        <p class="preview-description">${description}</p>
        ${actionButton}
        ${socialLinks}
      </div>
    </div>
  `;
}

/**
 * Escape HTML attribute values
 */
export function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
