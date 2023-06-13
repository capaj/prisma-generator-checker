import prettier from 'prettier'

export const formatFile = async (content: string): Promise<string> => {
  return prettier.resolveConfig(process.cwd()).then((options) => {
    if (!options) {
      return content // no prettier config was found, no need to format
    }

    const formatted = prettier.format(content, {
      ...options,
      parser: 'typescript',
    })

    return formatted
  })
}
