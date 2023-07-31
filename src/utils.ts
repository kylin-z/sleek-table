
import type { 
  Header as TanHeader, 
  Table as TanTable, 
  HeaderGroup as TanHeaderGroup,
} from '@tanstack/react-table';

export function processHeader<T>(header: TanHeader<T, unknown>, isPlaceholder: boolean) {
  if(header.isPlaceholder && header.subHeaders.length > 0) {
    header.sleekHeaderRowSpan = Math.max(...header.subHeaders.map(h => {
      processHeader(h, true);
      return h.sleekHeaderRowSpan;
    })) + 1;
  } else {
    header.sleekHeaderRowSpan = 1;
  }
  if(header.isSleekHeaderPlaceholder === undefined) {
    header.isSleekHeaderPlaceholder = isPlaceholder;
  }
  return header;
}

export function processFooter<T>(header: TanHeader<T, unknown>, deep: number = 0) {
  const newDeep = deep + 1;
  header.sleekFooterRowSpan = newDeep;
  if(header.isPlaceholder && header.subHeaders.length > 0) {
    header.subHeaders.forEach(sh => processFooter(sh, newDeep));
  } 
  if(header.isSleekFooterPlaceholder === undefined) {
    header.isSleekFooterPlaceholder = header.isPlaceholder;
  }
  return header;
}

export function calculateSleekColumns<T>(table: TanTable<T>) {
  const headerGroups = table.getHeaderGroups();
  const footerGroups = table.getFooterGroups();
  const newHeaderGroups: TanHeaderGroup<unknown>[] = [];
  const newFooterGroups: TanHeaderGroup<unknown>[] = [];
  headerGroups.forEach(headerGroup => {
    newHeaderGroups.push({
      ...headerGroup,
      headers: headerGroup.headers.map(h=>processHeader(h, false))
    });
  });
  footerGroups.forEach(footerGroup => {
    newFooterGroups.push({
      ...footerGroup,
      headers: footerGroup.headers.map(h=>processFooter(h, 0))
    })
  })
  return {
    headerGroups: newHeaderGroups,
    footerGroups: newFooterGroups
  }
}