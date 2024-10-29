# DeFiScan

A public website for the monitoring of the maturity and risks of DeFi technology.

Read more about the methodology behind the DeFi stages and risks in this [post](https://deficollective.org/blog/introducing-defiscan).

DeFiScan is built and maintained by the [DeFi Collective](https://DeFiCollective.org), a non-profit organization with the mission to make DeFi more transparent and secure for all.

## Getting started

To run the website on your local machine, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/deficollective/defi-scan.git
   ```

   After successful cloned. Head over to the project directory

   ```bash
   cd defi-scan
   ```

2. **Install Dependencies**:

   Navigate into the project directory and install the required dependencies:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   Start the app in development mode with the following command:

   ```bash
   npm run dev
   ```

   Head over to your browser and access the `localhost:3000`

4. **Build the App**:

   To build the app, run the following command:

   ```bash
   npm run build
   ```

---

- **Add New Protocol**:

New protocols reviews can be added as an `.md` file in the `content` folder.

`Important`:

- Make sure to name the file with dash (`-`) and without space. Example: `liquity-v1.md`
- The `.md` file needs to follow the protocol report structure outlined [here](src/content/template.md)

## Acknowledgement

This project utilizes the pizza diagrams developed and used inside L2Beat. We are grateful for their commitment to open access and knowledge sharing.

Their original work is open-sourced under the permissive MIT License, and we acknowledge their contribution.
