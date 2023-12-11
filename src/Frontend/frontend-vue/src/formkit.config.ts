import "@formkit/themes/genesis"
import { genesisIcons } from "@formkit/icons"
import type { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
// import { rootClasses } from './formkit.theme'
const config: DefaultConfigOptions = {
  icons: { ...genesisIcons },
  config: {
    // rootClasses,
    classes: generateClasses({
      global: {
        outer: '$reset '
      },
      text: {
        outer: '$reset form-control',
        inner:'$reset',
        input: '$reset input input-bordered'
      },
      select: {
        outer: '$reset form-control',
        inner:'$reset ',
       
        input: '$reset select select-bordered '
      },
      textarea: {
        outer: '$reset form-control',
        inner:'$reset ',
        input: '$reset textarea textarea-bordered'
      }
      
    })
   
  }
}

export default config
