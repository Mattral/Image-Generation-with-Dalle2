const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: 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,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  //prompt is the text that will be used to generate the image
  //size is the size of the image to be generated
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

module.exports = { generateImage };
