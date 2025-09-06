// Should prevent typescript errors for undeclared elements (that come with Tailwind UI components)

declare namespace astroHTML.JSX {
  interface ButtonHTMLAttributes {
    command?: string;
    commandfor?: string;
  }
  
  interface HTMLAttributes {
    popovertarget?: string;
    popover?: string | boolean;
    commandfor?: string;
    command?: string;
  }
}
