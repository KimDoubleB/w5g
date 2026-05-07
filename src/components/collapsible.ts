/**
 * Wires up an accordion: clicking trigger toggles `is-open` on root and
 * animates panel max-height. Caller styles arrow rotation via `.is-open` on root.
 */
export function makeCollapsible(
  root: HTMLElement,
  options: { trigger?: string; panel?: string; openByDefault?: boolean } = {},
): { open: () => void; close: () => void; toggle: () => void } {
  const triggerSel = options.trigger ?? '.collapsible__trigger';
  const panelSel = options.panel ?? '.collapsible__panel';
  const trigger = root.querySelector<HTMLElement>(triggerSel);
  const panel = root.querySelector<HTMLElement>(panelSel);
  if (!trigger || !panel) throw new Error('collapsible: trigger or panel not found');

  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('aria-expanded', 'false');

  const setOpen = (open: boolean) => {
    root.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = '0px';
    }
  };

  // Recompute height after content/image loads.
  const ro = new ResizeObserver(() => {
    if (root.classList.contains('is-open')) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
  ro.observe(panel);

  trigger.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(!root.classList.contains('is-open'));
    }
  });

  setOpen(!!options.openByDefault);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!root.classList.contains('is-open')),
  };
}

export const ARROW_DOWN_SVG =
  '<svg class="arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
