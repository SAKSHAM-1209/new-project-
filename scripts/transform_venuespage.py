from pathlib import Path
import re
path = Path('src/pages/VenuesPage.tsx')
text = path.read_text(encoding='utf-8')
lines = text.splitlines()
start_import = None
end_import = None
for i, line in enumerate(lines):
    if line.startswith('// ===== VENUE 1 ====='):
        start_import = i
    if start_import is not None and line.startswith('// ===== DEFAULT ====='):
        end_import = i
        break
if start_import is None or end_import is None:
    raise SystemExit('Could not locate manual import section')
def_line = None
for i, line in enumerate(lines[end_import+1:], start=end_import+1):
    if line.strip().startswith('const defaultVenue = '):
        def_line = i
        break
if def_line is None:
    raise SystemExit('Could not locate defaultVenue line')
new_lines = []
new_lines.extend(lines[:start_import])
new_lines.append('import { getVenueImages, fallbackVenueImage } from "@/lib/venueImages";')
new_lines.append('')
new_lines.extend(lines[end_import+1:def_line])
new_lines.append('const defaultVenue = fallbackVenueImage;')
body_lines = lines[def_line+1:]
inside_all = False
current_id = None
for line in body_lines:
    if not inside_all and line.strip().startswith('export const allVenues'):
        inside_all = True
    if inside_all:
        m = re.search(r'id:\s*(\d+),', line)
        if m:
            current_id = int(m.group(1))
        if current_id is not None and 'images:' in line:
            new_line = re.sub(r'images:\s*\[.*\]', f'images: getVenueImages({current_id})', line)
            new_lines.append(new_line)
            continue
        if line.strip() == '},' and current_id is not None:
            current_id = None
    new_lines.append(line)
out = '\n'.join(new_lines) + '\n'
if 'import venue' in out:
    print('Warning: still has import venue lines')
backup = path.with_suffix('.tsx.bak')
backup.write_text(text, encoding='utf-8')
path.write_text(out, encoding='utf-8')
print('Transformed VenuesPage.tsx with dynamic getVenueImages and no manual imports.')
