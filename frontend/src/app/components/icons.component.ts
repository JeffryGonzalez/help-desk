import { Component } from "@angular/core";

@Component({
  selector: 'app-icon-check',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.28 9.78a.75.75 0 0 0-1.06-1.06l-4.47 4.47l-1.474-1.474a.75.75 0 0 0-1.06 1.06l2.004 2.004a.75.75 0 0 0 1.06 0l5-5ZM6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25ZM4.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25Z"
      />
    </svg>
  `,
})
export class IconCheckComponent {}

@Component({
  selector: 'app-icon-error',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 12 12"
    >
      <path
        fill="currentColor"
        d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm-.75-2.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0Zm.258-4.84a.5.5 0 0 1 .984 0l.008.09V6l-.008.09a.5.5 0 0 1-.984 0L5.5 6V3.5l.008-.09Z"
      />
    </svg>
  `,
})
export class IconErrorComponent {}