// import slugify from "@sindresorhus/slugify";
import yaml from 'yaml'
import { formatMarkdown } from '../utils/markdown.ts'

/**
 * Convert string to slug
 */
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const peopleConvertToYamlResolver = async ({
  person
}: {
  person: {
    title: string
    slug: string
    jobTitle: string | null
    memberOf: {
      startDate: string | null
      endDate: string | null
      organisation: { name: string; slug: string }
      roleName: string
    }[]
  }
}) => {
  const mdContent = [
    '---',
    yaml
      .stringify({
        ...person,
        tags: ['people']
      })
      .trim(),
    '---',
    ''
  ].join('\n')
  const formatted = await formatMarkdown({ content: mdContent })
  return formatted
}
