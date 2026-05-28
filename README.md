# ERP Finance & Accounting System

A production-ready Enterprise Resource Planning (ERP) frontend application for comprehensive finance and accounting management. Built with React 19, Vite, Redux Toolkit, and Tailwind CSS. The application directly opens to the dashboard with no authentication required and integrates with all backend APIs from the specification.

## Features

### Core Modules
- **Dashboard**: Real-time financial KPIs and metrics
- **Sales Invoices**: Create, update, approve, reject, post, and manage sales invoices with tax breakdown
- **Accounts Payable**: Vendor management, AP invoice tracking, payment vouchers
- **Accounts Receivable**: Customer management and AR invoice tracking
- **General Ledger**: Journal entries, GL posting, chart of accounts management
- **Budget Management**: Budget headers, budget lines, utilization tracking, refresh utilities
- **Bank Reconciliation**: Transaction management, bank account management, reconciliation status
- **Tax Management**: GST slabs, HSN/SAC masters, tax configurations
- **Settings**: Company management, fiscal years, accounting periods, account groups/categories
- **Payment Processing**: Payment vouchers with approval and posting workflows

### Technical Features
- React 19 with modern hooks and Context API
- Redux Toolkit for predictable state management
- Direct dashboard loading (no authentication pages)
- Comprehensive API service layer aligned with backend OpenAPI spec
- Responsive design with Tailwind CSS v4
- Dark/Light theme support
- Data tables with pagination, sorting, filtering
- Form validation with React Hook Form + Yup
- Financial calculations and currency formatting
- Toast notifications for user feedback
- Comprehensive error handling with API interceptors

## Tech Stack

- **Frontend**: React 19 with React Router DOM
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form + Yup
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Export**: jsPDF, XLSX
- **Date Handling**: date-fns
- **Notifications**: Sonner

## Project Structure

```
src/
├── api/                    # API service layer
│   ├── axiosInstance.js   # Axios configuration with interceptors
│   └── services/          # API service modules
├── components/            # Reusable UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components (Header, Sidebar)
│   ├── tables/           # Data table component
│   └── ui/               # UI primitives (Button, Card, Modal, etc.)
├── config/               # Configuration files
│   └── theme.js         # Theme configuration
├── hooks/                # Custom React hooks
│   ├── useAuth.js       # Authentication hook
│   ├── useTheme.js      # Theme management hook
│   └── useMobile.js     # Mobile detection hook
├── layouts/              # Page layouts
├── pages/                # Page components (organized by module)
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard page
│   ├── sales/           # Sales/Invoicing pages
│   ├── vendors/         # Vendor management pages
│   ├── customers/       # Customer management pages
│   ├── accounting/      # GL, AP, AR pages
│   ├── budget/          # Budget management pages
│   ├── expenses/        # Expense management pages
│   ├── banking/         # Bank reconciliation pages
│   ├── tax/             # Tax management pages
│   ├── reports/         # Financial reports pages
│   └── settings/        # Settings pages
├── store/                # Redux store
│   └── slices/          # Redux slices for different modules
├── utils/                # Utility functions
│   ├── utils.js         # General utilities (formatting, calculations)
│   └── validationSchemas.js # Yup validation schemas
├── App.jsx              # Main app component
├── main.jsx             # Vite entry point
├── index.css            # Global styles
└── index.html           # HTML template
```

## Getting Started

### Quick Start

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Start development server:
```bash
npm run dev
```

The application will automatically open at `http://localhost:5173` with the dashboard displayed.

### Configuration

1. Copy environment template:
```bash
cp .env.example .env
```

2. Update `.env` with your backend API configuration:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_COMPANY_ID=550e8400-e29b-41d4-a716-446655440000
VITE_APP_NAME="ERP Finance & Accounting"
VITE_APP_VERSION=1.0.0
```

### Build & Deployment

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Direct Dashboard Access

The application opens directly to the dashboard. No login page or authentication is required. All features are immediately accessible.

## Configuration

### Theme Customization

Edit `src/config/theme.js` to customize colors, typography, and spacing.

### API Configuration

Edit `.env` to change the API endpoint:
```
VITE_API_BASE_URL=your_api_endpoint
```

## Features in Detail

### Authentication
- Email/Password login
- JWT token management
- Automatic token refresh
- Session persistence
- Protected routes

### State Management
- Redux store for centralized state
- Async thunks for API calls
- Slices for modular state management

### Forms & Validation
- React Hook Form for efficient form handling
- Yup schemas for validation
- Real-time error feedback
- Custom form components

### Data Tables
- Pagination support
- Column sorting
- Row filtering
- Edit/Delete actions
- Responsive design

### Financial Features
- Currency formatting
- Date formatting
- Tax calculations
- Budget variance analysis
- Financial ratio calculations

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the project and deploy the `dist` folder:
```bash
npm run build
# Deploy the dist folder
```

## API Integration

The application integrates with the following API endpoints (based on OpenAPI specification):

### Sales Invoice Endpoints
- `GET/PUT/DELETE /api/sales/invoices/{invoiceId}` - Invoice CRUD
- `PUT /api/sales/invoices/{invoiceId}/reject` - Reject invoice
- `PUT /api/sales/invoices/{invoiceId}/post` - Post to GL
- `PUT /api/sales/invoices/{invoiceId}/approve` - Approve invoice
- `PUT /api/sales/invoices/{invoiceId}/mark-as-paid` - Mark as paid
- `PUT /api/sales/invoices/{invoiceId}/cancel` - Cancel invoice
- `PUT /api/sales/invoices/{invoiceId}/partial-payment` - Record partial payment
- `GET/POST/PUT/DELETE /api/sales/invoices/{invoiceId}/taxes/{taxId}` - Tax management

### Vendor Endpoints
- `GET/PUT/DELETE /api/v1/vendors/{id}` - Vendor CRUD
- `PUT /api/v1/vendors/{id}/activate` - Activate vendor
- `PUT /api/v1/vendors/{id}/deactivate` - Deactivate vendor

### Customer Endpoints
- `GET/PUT/DELETE /api/v1/customers/{id}` - Customer CRUD
- `PUT /api/v1/customers/{id}/activate` - Activate customer
- `PUT /api/v1/customers/{id}/deactivate` - Deactivate customer

### AP Invoice Endpoints
- `GET/PUT/DELETE/PUT /api/ap/invoices/{invoiceId}` - AP invoice operations
- Similar endpoints as Sales Invoices for approval, posting, payment tracking

### Other Endpoints
- **Payment Vouchers**: `/api/v1/payment-vouchers/*`
- **Journal Entries**: `/api/v1/journal-entries/*`
- **Budget Management**: `/api/v1/budgets/*`, `/api/v1/budget-lines/*`
- **Bank Accounts**: `/api/v1/bank-accounts/*`
- **Transactions**: `/api/v1/transactions/*`
- **Tax Configuration**: `/api/v1/gst-slabs/*`, `/api/v1/hsn-sac-masters/*`
- **Accounting Settings**: `/api/v1/accounting-periods/*`, `/api/v1/fiscal-years/*`

All endpoints are defined in `src/api/services/allServices.js`.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and feature requests, please create an issue in the repository.

## Roadmap

- [ ] Multi-currency support
- [ ] Advanced approval workflows
- [ ] Audit trail logging
- [ ] Custom report builder
- [ ] Real-time notifications
- [ ] Mobile app
- [ ] API documentation
- [ ] Batch import/export
- [ ] Advanced analytics
- [ ] Compliance reporting
