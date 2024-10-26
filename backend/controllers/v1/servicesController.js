// controllers/v1/servicesController.js
export const getAllServices = (req, res) => {
    res.json({ message: "This is Version 1 of the API" });
};

export const getServiceById = (req, res) => {
    res.json({ message: `Fetching service ${req.params.id} from Version 1` });
};
