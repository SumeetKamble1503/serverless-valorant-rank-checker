// Controller for setting a user's rank
export async function HealthCheck(req, res) {
  try {
    const result = {
      msg: "Heathcheck Success",
      status: true,
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
