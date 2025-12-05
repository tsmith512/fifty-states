const { Transformer } = require('@parcel/plugin');
const fs = require('fs');
const path = require("path");

/**
 * An incredibly simple plugin to just inline a file, so I can keep the SVG file
 * separate, but without bundling in all of PostHTML for its include plugin.
 */
module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    const transformedCode = code.replace(/<include src="(.+?)"\/?>/g, (_, match) => {
      console.log(`Reading ${match} for replacement`);
      return fs.readFileSync(path.join(__dirname, "..", match), "utf-8").toString();
    });
    asset.setCode(transformedCode);
    return [asset];
  }
});
