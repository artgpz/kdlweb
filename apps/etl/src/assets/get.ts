import { join } from 'node:path'
import { IStorageFileSystem } from '../infrastructure/storage.ts'
import slugify from '@sindresorhus/slugify'
import { IMAGES_DIR } from '../utils/vars.ts'

export const assetsEvalUseCase = ({
  dir,
  storageModule,
  mode
}: {
  dir: string
  storageModule: typeof IStorageFileSystem
  mode: 'blog' | 'projects' | 'slides'
}) => {
  const mode_dir = join(dir, mode)
  const assets_dir = join(dir, IMAGES_DIR, mode)
  const assets_files = storageModule.listFiles({ dir: assets_dir })
  const docs_files = storageModule.listFiles({ dir: mode_dir })
  const files = docs_files?.map((filename) => ({
    filename,
    file: storageModule.readFile({ dir: mode_dir, filename })?.toString()
  }))
  const to_update = assets_files
    ?.map((asset) => {
      const original = asset
      const extension = asset.split('.').at(-1)
      const without_extension = asset.split('.').slice(0, -1).join('.')
      const slug = slugify(without_extension)
      if (slug === without_extension) {
        return null
      }
      return {
        original,
        extension,
        without_extension,
        slug,
        rename: false
      }
    })
    .filter((x) => x !== null)
  const updated = files?.reduce(
    (acc, { file, filename }) => {
      if (!file) {
        return acc
      }
      let changed = false
      let updated = file
      to_update?.map((asset) => {
        const index = updated?.indexOf(asset.without_extension)
        if (index !== -1) {
          changed = true
          const replaced = updated?.replaceAll(asset.without_extension, asset.slug)
          updated = replaced
          asset.rename = true
        }
        return asset
      })
      if (changed) {
        acc.push({ file: updated, filename })
      }
      return acc
    },
    [] as { file?: string; filename: string }[]
  )

  return {
    assets: to_update?.filter((asset) => asset.rename).map((asset) => asset.original),
    files: updated?.map((file) => file.filename)
  }
}
