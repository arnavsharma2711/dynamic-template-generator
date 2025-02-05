export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 md:px-8 md:py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between space-y-4 md:space-y-0 md:flex-row">
          <div className="text-center text-sm text-gray-600 leading-relaxed md:text-left">
            Built by{" "}
            <a
              href="https://www.arnavsharma.dev/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline underline-offset-4"
              aria-label="Arnav Sharma's Website"
            >
              Arnav Sharma
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/arnavsharma/template-generator"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline underline-offset-4"
              aria-label="Template Generator GitHub Repository"
            >
              GitHub
            </a>
            .
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Arnav Sharma. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
