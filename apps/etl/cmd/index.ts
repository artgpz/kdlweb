import { organisationsSyncFromProjectsIdsFileController } from '../src/organisations/controllers.ts'
import {
  projectsGenerateMarkdownFromIdsController,
  projectsGeneratePeopleFromDirController,
  projectsSyncIdFileController
} from '../src/projects/controllers.ts'
// import { projectsSyncIdFileUseCase } from "../src/projects/update.js";

type Args = '--action' | '--dest' | '--item-id'
// type Args = "--action" | "--dest" | "--type" | "--item-id" | "--config-file";
type Required = { required: true; message: string; options?: string[] }
type Optional = { required: false }

export const getArg = (arg: Args, options: Optional | Required) => {
  const index = process.argv.findIndex((el) => el.startsWith(arg))
  if (options.required && index === -1) {
    console.log(options.message)
    process.exit(1)
  }
  if (index === -1) {
    return [arg, undefined]
  }
  const value = String(process.argv[index].split('=')[1])
  if (options.required && value === 'undefined') {
    console.log(options.message)
    process.exit(1)
  }
  if (options?.required && options.options && !options.options.find((option) => option === value)) {
    console.log(`${arg} must be one of [${options.options.join(', ')}]; it was: ${value}`)
    process.exit(1)
  }

  return [arg, value]
}

export const handleArgs = (args: Record<Args, Optional | Required>) => {
  const results = Object.fromEntries(
    Object.entries(args).map((x: [Args, Optional | Required]) => getArg(...x))
  ) as Record<Args, string | undefined>
  // const results = args.flatMap((arg) => {
  // 	const entry = getArg(arg.key);
  // 	if (!entry.value && arg.required) {
  // 		console.log(`You need to specify a ${arg.key}, run with -h for help`);
  // 		process.exit();
  // 	}
  // 	return entry;
  // });
  return results
}

const main = async () => {
  console.time('etl')
  const apiKey = process.env.CLICKUP_API_KEY
  const apiUrl = process.env.CLICKUP_API_URL
  const teamId = process.env.CLICKUP_TEAM_ID
  const args = handleArgs({
    '--action': {
      required: true,
      options: ['sync', 'write', 'sync-orgs', 'sync-people'],
      message: `You need to provide an --action.`
    },
    '--dest': {
      required: true,
      message: `You need to provide an --dest.`
    },
    '--item-id': { required: false }
    // "--type": {
    // 	required: true,
    // 	options: ["active", "archived", "organisations"],
    // 	message: `You need to provide a --type.`,
    // },
    // "--config-file": { required: false },
  })

  if (args['--action'] === 'sync') {
    await projectsSyncIdFileController({
      teamId,
      apiKey,
      apiUrl,
      dir: args['--dest'],
      customItemId: args['--item-id']
    })
  }
  if (args['--action'] === 'write') {
    await projectsGenerateMarkdownFromIdsController({
      teamId,
      apiKey,
      apiUrl,
      dir: args['--dest']
    })
  }
  if (args['--action'] === 'sync-orgs') {
    await organisationsSyncFromProjectsIdsFileController({
      teamId,
      apiKey,
      apiUrl,
      dir: args['--dest']
    })
  }
  if (args['--action'] === 'sync-people') {
    await projectsGeneratePeopleFromDirController({ dir: args['--dest'] })
  }

  console.timeEnd('etl')
}

main()
