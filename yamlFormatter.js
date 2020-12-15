const fs = require('fs')
const yamlContent = fs.readFileSync('./example_yaml.yml', 'utf-8')

let output = '---\n'

const splitLines = yamlContent.split('\n')

splitLines.forEach((line, i) => {
	if (i !== 0 && i !== splitLines.length - 1) {
		const [key, value] = line.trim().split(': ')
		const keys = key.split('.')
		let template = ''

		keys.forEach((key, j) => {
			let tab = '   '
			if (j === 0 && !output.includes(key)) {
				template += `${key}:\n`
			} else if (j === keys.length - 1) {
				template += `${tab.repeat(j)}${key}: ${value}\n`
			} else {
				if (!output.includes(key))
				template += `${tab.repeat(j)}${key}:\n`
			}
		})
		output += template
	}
})

fs.writeFile('formatted-yaml.yml', output, err => { 
	if (err) throw err;
})