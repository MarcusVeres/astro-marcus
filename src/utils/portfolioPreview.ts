/**
 * Portfolio Preview HTML Generator
 *
 * NOTE: This file generates HTML strings for GLightbox.
 * The actual component is at: /src/components/portfolio/PortfolioLightboxCard.astro
 *
 * To change the design, edit the Astro component.
 * This function should match the component's output.
 */

export interface PortfolioLink {
  label: string;
  url: string;
  icon?: string;
}

export interface PreviewOptions {
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
 * This mirrors the PortfolioLightboxCard.astro component
 */
export function generatePreviewHTML(options: PreviewOptions): string {
  const {
    title,
    description,
    image,
    contentType,
    caseStudyUrl,
    externalUrl,
    externalLabel = 'View Project',
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

  // Generate action button
  let actionButton = '';
  if (contentType === 'case-study' && caseStudyUrl) {
    actionButton = `
      <a href="${caseStudyUrl}" class="btn-lightbox btn-primary" target="_blank">
        Read Full Case Study
        <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    `;
  } else if (contentType === 'external' && externalUrl) {
    actionButton = `
      <a href="${externalUrl}" class="btn-lightbox btn-primary" target="_blank" rel="noopener noreferrer">
        ${externalLabel}
        <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    `;
  }

  // Generate social links
  let socialLinks = '';
  if (links.length > 0) {
    const linkItems = links.map(link => `
      <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
        ${link.icon ? `<span class="icon-${link.icon}"></span>` : ''}
        ${link.label}
      </a>
    `).join('');

    socialLinks = `
      <div class="lightbox-social-links">
        ${linkItems}
      </div>
    `;
  }

  // Return complete preview card HTML (matches PortfolioLightboxCard.astro)
  return `
    <div class="lightbox-card">
      <!-- Background Image -->
      <div class="lightbox-bg" style="background-image: url('${image}');"></div>

      <!-- Glassmorphic Panel -->
      <div class="lightbox-panel">
        <!-- Drag Handle -->
        <div class="lightbox-handle">
          <div class="handle-bar"></div>
        </div>

        <!-- Content -->
        <div class="lightbox-content">
          <h2 class="lightbox-title">${title}</h2>
          <p class="lightbox-description">${description}</p>
          ${actionButton}
          ${socialLinks}
        </div>
      </div>
    </div>
  `;
}
