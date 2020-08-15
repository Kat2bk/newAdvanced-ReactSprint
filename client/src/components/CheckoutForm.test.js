import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const {getByText} = render(<CheckoutForm />);
    const header = getByText(/checkout form/i);
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    const {getByLabelText, getByText, getByTestId} = render(<CheckoutForm />);

    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const addressInput = getByLabelText(/address/i);
    const cityInput = getByLabelText(/city/i);
    const stateInput = getByLabelText(/state/i);
    const zipInput = getByLabelText(/zip/i);

    fireEvent.change(firstNameInput, {target: {value: "Katherine"}});
    fireEvent.change(lastNameInput, {target: {value: "Kumar"}});
    fireEvent.change(addressInput, {target: {value: "Jefferson"}});
    fireEvent.change(cityInput, {target: {value: "LC"}});
    fireEvent.change(stateInput, {target: {value: "Louisiana"}});
    fireEvent.change(zipInput, {target: {value: "706"}});

    expect(firstNameInput.value).toBe("Katherine");
    expect(lastNameInput.value).toBe("Kumar");
    expect(addressInput.value).toBe("Jefferson");
    expect(cityInput.value).toBe("LC");
    expect(stateInput.value).toBe("Louisiana");
    expect(zipInput.value).toBe("706");

    const submit = getByText("Checkout");
    fireEvent.click(submit);

    const getName = getByText(/katherine/i);
    expect(getName).toBeInTheDocument();

    const success = getByTestId(/successMessage/i);
    expect(success).toBeInTheDocument();
});
