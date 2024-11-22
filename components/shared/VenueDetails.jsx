const VenueDetails = ({ venue }) => {
  const {
    name,
    address,
    city,
    country,
    location,
    parkingDetail,
    generalInfo,
    accessibleSeatingDetail,
    boxOfficeInfo,
    timezone,
    postalCode,
    ada,
  } = venue;

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Venue Location */}
      <div>
        <h3 className="mb-2 text-lg underline">Location</h3>
        <p>
          {address?.line1}, {address?.line2 && `${address.line2},`} {city?.name}, {country?.name}, {postalCode}
        </p>
      </div>

      {/* Accessibility Details */}
      {accessibleSeatingDetail && (
        <div>
          <h3 className="mb-2 text-lg underline">Accessibility</h3>
          <p>{accessibleSeatingDetail}</p>
          {ada && <p>
            For more information on accessible seating and booking assistance, call:{" "}
            <strong>{ada.adaPhones}</strong>
          </p>}
        </div>
      )}

      {/* Parking Information */}
      {parkingDetail && <div>
        <h3 className="mb-2 text-lg underline">Parking</h3>
        <p>{parkingDetail}</p>
      </div>}

      <div>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${location?.latitude},${location?.longitude}`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="The O2 Location"
          className="mt-4"
        ></iframe>
      </div>
    </div>
  )
}

export default VenueDetails