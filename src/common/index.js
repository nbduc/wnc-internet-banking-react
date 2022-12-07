import ManageHistoryTwoToneIcon from "@mui/icons-material/ManageHistoryTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ContactsTwoToneIcon from "@mui/icons-material/ContactsTwoTone";
import MoveDownTwoToneIcon from "@mui/icons-material/MoveDownTwoTone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";

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

export const employeeListItems = [
    {
        title: "Tạo tài khoản khách hàng",
        icon: PersonAddIcon,
        link: "/create-account",
    },
    {
        title: "Nạp tiền vào tài khoản",
        icon: AddCardIcon,
        link: "/direct-deposit",
    },
    {
        title: "Lịch sử giao dịch",
        icon: ReceiptLongIcon,
        link: "/transaction-history",
    },
];

export const adminListItems = [
    {
        title: "Quản lý nhân viên",
        icon: BadgeIcon,
        link: "/employee-management",
    },
    {
        title: "Giao dịch với các ngân hàng khác",
        icon: AccountBalanceIcon,
        link: "/partner-transaction-history",
    },
];

export const userListItems = [
    {
        title: "Đổi mật khẩu",
        icon: VpnKeyIcon,
        link: "/change-password",
    },
    {
        title: "Đăng xuất",
        icon: LogoutIcon,
        link: "/logout",
    },
];

export const drawerWidth = 340;

export const ROLES = {
    admin: "admin",
    customer: "customer",
    employee: "employee",
};
