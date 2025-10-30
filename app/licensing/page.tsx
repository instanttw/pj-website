import fs from 'fs/promises';
import path from 'path';

export default async function LicensingPage() {
  const cwd = process.cwd();
  const gplPath = path.join(cwd, 'notes', 'GPL.md.txt');
  const readmePath = path.join(cwd, 'notes', 'README_License.md.txt');

  const [gplText, readmeText] = await Promise.all([
    fs.readFile(gplPath, 'utf8'),
    fs.readFile(readmePath, 'utf8'),
  ]);

  return (
    <div className="px-4 lg:px-8 py-12">
      <div>
        <h1 className="text-4xl font-bold text-black mb-8">Licensing</h1>

        <section className="prose prose-gray max-w-none">
          <h2>GNU General Public License (GPL)</h2>
          <pre className="whitespace-pre-wrap text-sm leading-6 bg-gray-50 p-4 rounded-md">{gplText}</pre>
        </section>

        <section className="prose prose-gray max-w-none mt-12">
          <h2>License Readme</h2>
          <pre className="whitespace-pre-wrap text-sm leading-6 bg-gray-50 p-4 rounded-md">{readmeText}</pre>
        </section>
      </div>
    </div>
  );
}
