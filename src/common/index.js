import ManageHistoryTwoToneIcon from "@mui/icons-material/ManageHistoryTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ContactsTwoToneIcon from "@mui/icons-material/ContactsTwoTone";
import MoveDownTwoToneIcon from "@mui/icons-material/MoveDownTwoTone";

export const customerListItems = [
    {
        title: "Trang chủ",
        icon: HomeTwoToneIcon,
        link: "/",
    },
    {
        title: "Danh sách người nhận",
        icon: ContactsTwoToneIcon,
        link: "/recipients",
    },
    {
        title: "Chuyển khoản",
        icon: MoveDownTwoToneIcon,
        link: "/transfer",
    },
    {
        title: "Quản lý nhắc nợ",
        icon: ManageHistoryTwoToneIcon,
        link: "/payment-requests",
    },
];

export const drawerWidth = 340;
