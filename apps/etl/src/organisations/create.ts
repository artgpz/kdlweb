import { join } from 'node:path'
import { formatMarkdown } from '../utils/markdown.ts'
import type { IStorageFileSystem } from '../infrastructure/storage.ts'
import { slugify } from '../utils/index.ts'

export const organisationCreateOrganisationsUseCase = async ({
  dir,
  names,
  tag,
  storageModule
}: {
  dir: string
  names: string[]
  tag: 'organisations' | 'departments'
  storageModule: typeof IStorageFileSystem
}) => {
  const orgDir = join(dir, 'about/organisations')
  const created = await Promise.all(
    names
      // skip writing `External`
      .filter((name) => name.toLowerCase() !== 'external')
      .map((name) => {
        const slug = slugify(name)
        const frontmatter = [
          '---',
          `title: ${name}`,
          'alternateName: null',
          `tags: [${tag}]`,
          `slug: ${slug}`,
          'foundingDate: null',
          'dissolutionDate: null',
          'parentOrganisation: null',
          'subOrganisations: []',
          'urls: []',
          '---'
        ].join('\n')
        return formatMarkdown({ content: frontmatter }).then((content) => {
          storageModule.writeFile({ dir: orgDir, content, filename: `${slug}.md` })
          return {
            content,
            metadata: {
              title: name,
              alternateName: null,
              tags: [tag],
              slug,
              foundingDate: null,
              dissolutionDate: null,
              parentOrganisation: null,
              subOrganisations: [],
              urls: []
            }
          }
        })
      })
  )
  return created
}
