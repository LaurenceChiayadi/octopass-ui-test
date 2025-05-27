interface CustomerInfoPanelProps {
  customer: ICustomer;
}

const CustomerInfoPanel = (props: CustomerInfoPanelProps) => {
  if (!props.customer) {
    return <></>;
  }
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">
        {props.customer.companyName}
      </h1>
      <div className="flex gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full rounded bg-white gap-2 p-2">
            <div className="w-1/2">
              <h5 className="font-semibold">Contact Name:</h5>
              <p>{props.customer.contactName}</p>
            </div>
            <div className="w-1/2">
              <h5 className="font-semibold">Contact Title:</h5>
              <p>{props.customer.contactTitle}</p>
            </div>
          </div>
          <div className="flex w-full rounded bg-white gap-2 p-2">
            <div className="w-1/2">
              <h5 className="font-semibold">Phone Number:</h5>
              <p>{props.customer.phone}</p>
            </div>
            <div className="w-1/2">
              <h5 className="font-semibold">Fax:</h5>
              <p>{props.customer.fax}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full rounded gap-2 bg-white p-2">
          <div className="flex">
            <div className="w-1/2">
              <h5 className="font-semibold">Address:</h5>
              <p>{props.customer.address}</p>
            </div>
            <div className="w-1/2">
              <h5 className="font-semibold">Country:</h5>
              <p>{props.customer.country}</p>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <h5 className="font-semibold">City:</h5>
              <p>{props.customer.city}</p>
            </div>
            <div className="w-1/2">
              <h5 className="font-semibold">Postcode:</h5>
              <p>{props.customer.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoPanel;
