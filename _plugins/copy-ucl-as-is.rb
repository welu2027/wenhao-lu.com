# ucl/ is a finished static site, so undo jekyll-terser's wrapper on its scripts
# and let Jekyll copy them byte for byte. Runs last so terser has already swapped.
module Jekyll
  class CopyUclAsIs < Generator
    priority :lowest

    def generate(site)
      site.static_files.map! do |file|
        next file unless file.relative_path.start_with?("/ucl/") && file.is_a?(Jekyll::Terser::JSFile)

        StaticFile.new(site, site.source, File.dirname(file.relative_path), file.name)
      end
    end
  end
end
