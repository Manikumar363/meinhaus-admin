import {
  Bell,
  FilePen,
  LayoutDashboard,
  MessageSquareText,
  Plus,
  Wifi,
} from "lucide-react";

import {
  aboutIcon as AboutIcon,
  educationIcon as EducationIcon,
  galleryIcon as GalleryIcon,
  complimentaryIcon as ComplimentaryIcon,
  slidericon as SliderIcon,
  articleIcon as ArticleIcon,
  testimonalsIcon as TestimonialsIcon,
  bookingIcon as BookingIcon,
  pricefeedbackIcon as PriceFeedbackIcon,
  AllEstimateSection,
  serviceIcon as ServiceIcon,
} from "../components/ui/icons";

// Navbar links
export const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Wifi,
  },
  {
    name: "Paid Details",
    path: "/paid-details",
    icon: MessageSquareText,
  },
  {
    name: "Create & Send",
    path: "/create-send",
    icon: Bell,
  },
];

// Sidebar links
export const sidebarLinks = [
  {
    path: "/create-estimate",
    label: "Create Estimate",
    icon: Plus,
  },
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/content/sliders",
    label: "Content Management",
    icon: ArticleIcon,
    children: [
      {
        path: "/content/sliders",
        label: "Slider Section",
        icon: SliderIcon,
      },
      {
        path: "/content/articles",
        label: "Articles Section",
        icon: ArticleIcon,
      },
      {
        path: "/content/testimonials",
        label: "Client Testimonials",
        icon: TestimonialsIcon,
      },
      {
        path: "/content/complementary-services",
        label: "Complimentary Services",
        icon: ComplimentaryIcon,
      },
    ],
  },
  {
    path: "/bookings",
    label: "Bookings",
    icon: BookingIcon,
  },
  {
    path: "/price-feedback",
    label: "Price Feedback",
    icon: PriceFeedbackIcon,
  },
  {
    path: "/all-estimates",
    label: "All Estimates",
    icon: AllEstimateSection,
  },
  {
    path: "/draft-estimates",
    label: "Draft Estimates",
    icon: FilePen,
  },
  {
    path: "/about",
    label: "About Section",
    icon: AboutIcon,
  },
  {
    path: "/education",
    label: "Education Section",
    icon: EducationIcon,
  },
  {
    path: "/gallery",
    label: "Gallery Section",
    icon: GalleryIcon,
  },
  {
    path: "/query",
    label: "Query",
    icon: ArticleIcon,
  },
  {
    path: "/services",
    label: "Service Section",
    icon: ServiceIcon,
  },
];
// Professionals
export const professionals = [
  {
    id: 1,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Sent",
    bidAmount: "$3466",
    bidAt: "11 Aug 2025 at 06:03:12",
  },
  {
    id: 2,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Sent",
    bidAmount: "$3466",
    bidAt: "11 Aug 2025 at 06:03:12",
  },
  {
    id: 3,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Viewed",
    bidAmount: "$3466",
    bidAt: "11 Aug 2025 at 06:03:12",
  },
  {
    id: 4,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Added",
    bidAmount: "$3466",
    bidAt: "11 Aug 2025 at 06:03:12",
  },
];

export const estimatesData = [
  {
    id: 1,
    jobId: "#JOB-394413",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      phone: "+11209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada...",
    price: "$21345",
    services: "Appliance Install",
    moreServices: "+2 more services",
    assignStatus: "2/3",
    status: "Requested",
    statusColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    jobId: "#JOB-394413",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      phone: "+11209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada...",
    price: "$21345",
    services: "Appliance Install",
    moreServices: "+2 more services",
    assignStatus: "2/3",
    status: "Paid",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    jobId: "#JOB-394413",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      phone: "+11209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada...",
    price: "$21345",
    services: "Appliance Install",
    moreServices: "+2 more services",
    assignStatus: "2/3",
    status: "Paid",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    jobId: "#JOB-394413",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      phone: "+11209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada...",
    price: "$21345",
    services: "Appliance Install",
    moreServices: "+2 more services",
    assignStatus: "2/3",
    status: "Paid",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    jobId: "#JOB-394413",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      phone: "+11209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada...",
    price: "$21345",
    services: "Appliance Install",
    moreServices: "+2 more services",
    assignStatus: "2/3",
    status: "Paid",
    statusColor: "bg-green-100 text-green-600",
  },
];

export const tabs = [
  { id: "all", label: "All Estimates", count: 58 },
  { id: "paid", label: "Paid", count: 12 },
  { id: "requested", label: "Requested", count: 23 },
  { id: "viewed", label: "Viewed", count: 10 },
  { id: "not-initiated", label: "Not Initiated", count: 2 },
];

export const servicesData = [
  {
    id: 1,
    serviceName: "Appliance Install",
    regAmount: "$32",
    totalCost: "$4800",
    paymentStatus: "Requested",
    paymentStatusColor: "bg-orange-100 text-orange-600",
    jobAssignStatus: "Not Initiated",
    jobAssignStatusColor: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    serviceName: "Appliance Repair",
    regAmount: "$30",
    totalCost: "$5500",
    paymentStatus: "Paid",
    paymentStatusColor: "bg-green-100 text-green-600",
    jobAssignStatus: "Link Created",
    jobAssignStatusColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    serviceName: "Flooring and Tile Services",
    regAmount: "$50",
    totalCost: "$5500",
    paymentStatus: "Paid",
    paymentStatusColor: "bg-green-100 text-green-600",
    jobAssignStatus: "Bidding Ongoing",
    jobAssignStatusColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    serviceName: "Flooring and Tile Services",
    regAmount: "$50",
    totalCost: "$5500",
    paymentStatus: "Paid",
    paymentStatusColor: "bg-green-100 text-green-600",
    jobAssignStatus: "Assigned",
    jobAssignStatusColor: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    serviceName: "Flooring and Tile Services",
    regAmount: "$50",
    totalCost: "$5500",
    paymentStatus: "Paid",
    paymentStatusColor: "bg-green-100 text-green-600",
    jobAssignStatus: "Work Ongoing",
    jobAssignStatusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 6,
    serviceName: "Flooring and Tile Services",
    regAmount: "$50",
    totalCost: "$5500",
    paymentStatus: "Paid",
    paymentStatusColor: "bg-green-100 text-green-600",
    jobAssignStatus: "Completed",
    jobAssignStatusColor: "bg-green-100 text-green-600",
  },
];

export const invoiceData = [
  {
    srNo: 1,
    amount: "$1200",
    description: "Registered Amount",
    status: "Completed",
    method: "UPI",
    date: "2025-09-20",
  },
  {
    srNo: 2,
    amount: "$2100",
    description: "Registered Amount",
    status: "Pending",
    method: "-",
    date: "2025-09-25",
  },
  {
    srNo: 3,
    amount: "$750",
    description: "Registered Amount",
    status: "Not Initiated",
    method: "-",
    date: "2025-10-05",
  },
];

export const draftEstimates = [
  {
    srNo: 1,
    name: "Flooring and Tiles Services",
    customer: {
      name: "James Robert",
      phoneNumber: "+1234567890",
    },
    emailId: "jamesrobert@gmail.com",
    projectTitle: "Flooring and Tiles Services",
    lastEdited: "1 hour ago",
    createdAt: "25 July 2025,17:14:26",
  },
  {
    srNo: 2,
    name: "Flooring and Tiles Services",
    customer: {
      name: "James Robert",
      phoneNumber: "+1234567890",
    },
    emailId: "jamesrobert@gmail.com",
    projectTitle: "Flooring and Tiles Services",
    lastEdited: "1 hour ago",
    createdAt: "25 July 2025,17:14:26",
  },
  {
    srNo: 3,
    name: "Flooring and Tiles Services",
    customer: {
      name: "James Robert",
      phoneNumber: "+1234567890",
    },
    emailId: "jamesrobert@gmail.com",
    projectTitle: "Flooring and Tiles Services",
    lastEdited: "1 hour ago",
    createdAt: "25 July 2025,17:14:26",
  },
  {
    srNo: 4,
    name: "Flooring and Tiles Services",
    customer: {
      name: "James Robert",
      phoneNumber: "+1234567890",
    },
    emailId: "jamesrobert@gmail.com",
    projectTitle: "Flooring and Tiles Services",
    lastEdited: "1 hour ago",
    createdAt: "25 July 2025,17:14:26",
  },
  {
    srNo: 5,
    name: "Flooring and Tiles Services",
    customer: {
      name: "James Robert",
      phoneNumber: "+1234567890",
    },
    emailId: "jamesrobert@gmail.com",
    projectTitle: "Flooring and Tiles Services",
    lastEdited: "1 hour ago",
    createdAt: "25 July 2025,17:14:26",
  },
];

//Bookings
export const bookingsData = [
  {
    id: "1",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      email: "jamesrobert@gmail.com",
      phone: "+1209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada,...",
    time: "Less than 1 week",
    createdAt: "25 July, 2025, 17:14:25",
    status: "Not Viewed",
    fromShare: true,
  },
  {
    id: "2",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      email: "jamesrobert@gmail.com",
      phone: "+1209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada,...",
    time: "Less than 1 week",
    createdAt: "25 July, 2025, 17:14:25",
    status: "Not Viewed",
    fromShare: false,
  },
  {
    id: "3",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      email: "jamesrobert@gmail.com",
      phone: "+1209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada,...",
    time: "Less than 1 week",
    createdAt: "25 July, 2025, 17:14:25",
    status: "Viewed",
    fromShare: false,
  },
  {
    id: "4",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      email: "jamesrobert@gmail.com",
      phone: "+1209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada,...",
    time: "Less than 1 week",
    createdAt: "25 July, 2025, 17:14:25",
    status: "Viewed",
    fromShare: true,
  },
  {
    id: "5",
    title: "Renovation...",
    customer: {
      name: "James Robert",
      email: "jamesrobert@gmail.com",
      phone: "+1209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada,...",
    time: "Less than 1 week",
    createdAt: "25 Sept, 2025, 17:14:25",
    status: "Viewed",
    fromShare: false,
  },
  {
    id: "6",
    title: "Home Painting service...",
    customer: {
      name: "James Robert",
      email: "jamesrobert@gmail.com",
      phone: "+1209876534",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    address: "Highway 407, Vaughan, Ontario, Canada,...",
    time: "1 week",
    createdAt: "2 Oct, 2025, 17:14:25",
    status: "Viewed",
    fromShare: true,
  },
];

export const dummyFeedback = [
  {
    id: 1,
    service: "Flooring and Tile Services",
    requests: "-",
    amount: "-",
    created: "28 July, 2025 at 16:49:37",
    status: "Not Sent",
  },
  {
    id: 2,
    service: "Flooring and Tile Services",
    requests: "-",
    amount: "$5500",
    created: "28 July, 2025 at 16:49:37",
    status: "Not Sent",
  },
  {
    id: 3,
    service: "Flooring and Tile Services",
    requests: "-",
    amount: "$5500",
    created: "28 July, 2025 at 16:49:37",
    status: "Sent",
  },
];

export const projectDetailsTabs = [
  { id: "convert", label: "Convert to Estimate" },
  { id: "feedback", label: "Price Feedback", count: 3 },
  { id: "info", label: "Request Info", count: 2 },
];

export const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    address: "123 Main St, Toronto, Canada",
    coordinates: "43.65107,-79.347015",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 987-654-3210",
    address: "456 Queen St, Vancouver, Canada",
    coordinates: "49.282729,-123.120738",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 555-123-4567",
    address: "789 King St, Montreal, Canada",
    coordinates: "45.50169,-73.567253",
  },
];

export const projectImages = [
  "https://picsum.photos/id/1015/200/150",
  "https://picsum.photos/id/1016/200/150",
  "https://picsum.photos/id/1018/200/150",
  "https://picsum.photos/id/1020/200/150",
  "https://picsum.photos/id/1024/200/150",
  "https://picsum.photos/id/1025/200/150",
  "https://picsum.photos/id/1035/200/150",
  "https://picsum.photos/id/1037/200/150",
  "https://picsum.photos/id/1039/200/150",
];
