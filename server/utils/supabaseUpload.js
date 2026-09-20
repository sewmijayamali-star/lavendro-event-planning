const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const uploadProfilePhoto = async (file) => {
  if (!file) {
    throw new Error("Profile photo is required.");
  }

  const fileExtension =
    file.originalname.split(".").pop();

  const fileName =
    `event-planners/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExtension}`;

  const { error } = await supabase.storage
    .from("event planners images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    console.error(
      "Supabase profile photo upload error:",
      error
    );

    throw new Error(
      "Failed to upload profile photo."
    );
  }

  const { data } = supabase.storage
    .from("event planners images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

module.exports = {
  uploadProfilePhoto
};