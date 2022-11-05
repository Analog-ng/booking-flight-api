exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}


// get all flights
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await models.Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// get one flight
exports.getOneFlight = async (req, res) => {
    try {
        const flight = await models.Flight.findById(req.params.id);
        res.json(flight);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// create one flight
exports.createFlight = async (req, res) => {
    const flight = new models.Flight({
        flightNumber: req.body.flightNumber,
        departure: req.body.departure,
        arrival: req.body.arrival,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        price: req.body.price
    });
    try {
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// update one flight
exports.updateFlight = async (req, res) => {
    try {
        const flight = await models.Flight.findById(req.params.id);
        if (flight == null) {
            return res.status(404).json({ message: "Cannot find flight" });
        }
        if (req.body.flightNumber != null) {
            flight.flightNumber = req.body.flightNumber;
        }
        if (req.body.departure != null) {
            flight.departure = req.body.departure;
        }
        if (req.body.arrival != null) {
            flight.arrival = req.body.arrival;
        }
        if (req.body.departureTime != null) {
            flight.departureTime = req.body.departureTime;
        }
        if (req.body.arrivalTime != null) {
            flight.arrivalTime = req.body.arrivalTime;
        }
        if (req.body.price != null) {
            flight.price = req.body.price;
        }
        const updatedFlight = await flight.save();
        res.json(updatedFlight);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// delete one flight
exports.deleteFlight = async (req, res) => {
    try {
        const flight = await models.Flight.findById(req.params.id);
        if (flight == null) {
            return res.status(404).json({ message: "Cannot find flight" });
        }
        await flight.remove();
        res.json({ message: "Deleted flight" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}






























