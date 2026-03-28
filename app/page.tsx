/* eslint-disable @next/next/no-img-element */

import styles from "./page.module.css";
import ThemeToggle from "./theme-toggle";

type Stat = {
  icon: string;
  value: string;
  label: string;
};

type UniRow = {
  rank: number;
  flag?: string;
  shortName: string;
  fullName: string;
  founded: string;
  city: string;
  type: string;
  majors: string;
  majorCount: string;
  programs: string;
  description: string;
  category: string;
  subcategory: string;
  updatedAt: string;
  topFaculties: string[];
  campuses: string[];
};

type CategoryOption = {
  label: string;
  color: string;
};

const stats: Stat[] = [
  { icon: "🏫", value: "164", label: "trường" },
  { icon: "👩‍🎓", value: "2.3M", label: "sinh viên" },
  { icon: "📚", value: "4.800+", label: "ngành học" },
];

const primaryTabs = ["Trường", "Ngành", "Tỉnh thành", "Loại trường", "Xét tuyển", "Điểm chuẩn"];
const secondaryTabs = ["FAQ", "Thêm trường"];

const categories: CategoryOption[] = [
  { label: "Công nghệ thông tin", color: "#6366f1" },
  { label: "Kỹ thuật – Kỹ sư", color: "#8b5cf6" },
  { label: "Kinh tế – Quản trị", color: "#ec4899" },
  { label: "Y – Dược", color: "#f43f5e" },
  { label: "Sư phạm – Giáo dục", color: "#f97316" },
  { label: "Khoa học tự nhiên", color: "#eab308" },
  { label: "Luật – Xã hội", color: "#22c55e" },
  { label: "Nghệ thuật – Thiết kế", color: "#14b8a6" },
];

const rows: UniRow[] = [
  {
    rank: 1,
    flag: "🇻🇳",
    shortName: "ANS",
    fullName: "Đại học An ninh nhân dân",
    founded: "1976",
    city: "Hồ Chí Minh",
    type: "Công lập",
    majors: "An ninh Công an Quân sự",
    majorCount: "+1",
    programs: "2",
    description: "Trường đào tạo cán bộ an ninh, chuyên ngành an ninh và trật tự xã hội thuộc Bộ Công an.",
    category: "An ninh – Quân sự",
    subcategory: "Công lập",
    updatedAt: "2024-03-01",
    topFaculties: ["Khoa An ninh", "Khoa Nghiệp vụ"],
    campuses: ["Hồ Chí Minh"],
  },
  {
    rank: 2,
    flag: "🇻🇳",
    shortName: "HUST",
    fullName: "Đại học Bách khoa Hà Nội",
    founded: "1956",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Kỹ thuật kỹ sư",
    majorCount: "+9",
    programs: "65",
    description: "Trường đại học kỹ thuật hàng đầu Việt Nam, đào tạo kỹ sư và thạc sĩ trong nhiều lĩnh vực.",
    category: "Kỹ thuật – Kỹ sư",
    subcategory: "Công lập",
    updatedAt: "2024-03-15",
    topFaculties: ["Khoa CNTT", "Khoa Điện", "Khoa Cơ khí"],
    campuses: ["Hà Nội", "Bắc Ninh"],
  },
  {
    rank: 3,
    flag: "🇻🇳",
    shortName: "CTU",
    fullName: "Đại học Cần Thơ",
    founded: "1966",
    city: "Cần Thơ",
    type: "Công lập",
    majors: "Khoa học tự nhiên",
    majorCount: "+16",
    programs: "100",
    description: "Trường đại học trọng điểm vùng đồng bằng sông Cửu Long, đào tạo đa ngành đa lĩnh vực.",
    category: "Khoa học tự nhiên",
    subcategory: "Công lập",
    updatedAt: "2024-02-20",
    topFaculties: ["Khoa Nông nghiệp", "Khoa CNTT", "Khoa Kinh tế"],
    campuses: ["Cần Thơ"],
  },
  {
    rank: 4,
    flag: "🇻🇳",
    shortName: "NEU",
    fullName: "Đại học Kinh tế Quốc dân",
    founded: "1956",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Kinh tế – Quản trị",
    majorCount: "+10",
    programs: "58",
    description: "Trường đại học kinh tế hàng đầu phía Bắc, đào tạo nhân lực kinh tế và quản trị kinh doanh.",
    category: "Kinh tế – Quản trị",
    subcategory: "Công lập",
    updatedAt: "2024-03-05",
    topFaculties: ["Khoa Kế toán", "Khoa QTKD", "Khoa Tài chính"],
    campuses: ["Hà Nội"],
  },
  {
    rank: 5,
    flag: "🇻🇳",
    shortName: "FPT",
    fullName: "Đại học FPT",
    founded: "2006",
    city: "Hà Nội",
    type: "Tư thục",
    majors: "Công nghệ thông tin",
    majorCount: "+4",
    programs: "12",
    description: "Trường đại học tư thục do tập đoàn FPT sáng lập, chuyên đào tạo CNTT và kinh doanh quốc tế.",
    category: "Công nghệ thông tin",
    subcategory: "Tư thục",
    updatedAt: "2024-01-10",
    topFaculties: ["Khoa Phần mềm", "Khoa AI", "Khoa Kinh tế"],
    campuses: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ"],
  },
  {
    rank: 6,
    flag: "🇻🇳",
    shortName: "VNU-HN",
    fullName: "Đại học Quốc gia Hà Nội",
    founded: "1993",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Khoa học tự nhiên",
    majorCount: "+15",
    programs: "120",
    description: "Hệ thống đại học trọng điểm quốc gia tại Hà Nội, tập hợp nhiều trường thành viên đa ngành.",
    category: "Khoa học tự nhiên",
    subcategory: "Công lập",
    updatedAt: "2024-01-15",
    topFaculties: ["Khoa KHTN", "Khoa KHXH", "Khoa Luật"],
    campuses: ["Hà Nội", "Hòa Lạc"],
  },
  {
    rank: 7,
    flag: "🇻🇳",
    shortName: "VNU-HCM",
    fullName: "Đại học Quốc gia TP. Hồ Chí Minh",
    founded: "1995",
    city: "Hồ Chí Minh",
    type: "Công lập",
    majors: "Công nghệ thông tin",
    majorCount: "+14",
    programs: "150",
    description: "Hệ thống đại học trọng điểm quốc gia tại TP.HCM, gồm nhiều trường thành viên uy tín.",
    category: "Công nghệ thông tin",
    subcategory: "Công lập",
    updatedAt: "2024-02-20",
    topFaculties: ["Khoa CNTT", "Khoa Kỹ thuật", "Khoa Kinh tế"],
    campuses: ["Hồ Chí Minh", "Bình Dương"],
  },
  {
    rank: 8,
    flag: "🇻🇳",
    shortName: "HNUE",
    fullName: "Đại học Sư phạm Hà Nội",
    founded: "1951",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Sư phạm – Giáo dục",
    majorCount: "+8",
    programs: "45",
    description: "Trường đại học sư phạm hàng đầu cả nước, chuyên đào tạo giáo viên và nghiên cứu giáo dục.",
    category: "Sư phạm – Giáo dục",
    subcategory: "Công lập",
    updatedAt: "2023-09-30",
    topFaculties: ["Khoa Toán", "Khoa Văn", "Khoa Lý"],
    campuses: ["Hà Nội"],
  },
  {
    rank: 9,
    flag: "🇻🇳",
    shortName: "HMU",
    fullName: "Đại học Y Hà Nội",
    founded: "1902",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Y – Dược",
    majorCount: "+6",
    programs: "18",
    description: "Trường đại học y lâu đời nhất Việt Nam, đào tạo bác sĩ, dược sĩ và các ngành y tế liên quan.",
    category: "Y – Dược",
    subcategory: "Công lập",
    updatedAt: "2023-12-05",
    topFaculties: ["Khoa Y đa khoa", "Khoa Răng hàm mặt", "Khoa Y tế công cộng"],
    campuses: ["Hà Nội"],
  },
  {
    rank: 10,
    flag: "🇻🇳",
    shortName: "UMP",
    fullName: "Đại học Y Dược TP. Hồ Chí Minh",
    founded: "1947",
    city: "Hồ Chí Minh",
    type: "Công lập",
    majors: "Y – Dược",
    majorCount: "+7",
    programs: "22",
    description: "Trường đào tạo nhân lực y tế chất lượng cao khu vực phía Nam, với nhiều chuyên ngành y dược.",
    category: "Y – Dược",
    subcategory: "Công lập",
    updatedAt: "2024-03-10",
    topFaculties: ["Khoa Dược", "Khoa Y đa khoa", "Khoa Điều dưỡng"],
    campuses: ["Hồ Chí Minh"],
  },
  {
    rank: 11,
    flag: "🇻🇳",
    shortName: "UEH",
    fullName: "Đại học Kinh tế TP. Hồ Chí Minh",
    founded: "1976",
    city: "Hồ Chí Minh",
    type: "Công lập",
    majors: "Kinh tế – Quản trị",
    majorCount: "+11",
    programs: "60",
    description: "Trường đại học kinh tế hàng đầu phía Nam, đào tạo nhân lực kinh tế và quản trị kinh doanh.",
    category: "Kinh tế – Quản trị",
    subcategory: "Công lập",
    updatedAt: "2023-11-20",
    topFaculties: ["Khoa Tài chính", "Khoa QTKD", "Khoa Kế toán"],
    campuses: ["Hồ Chí Minh", "Vĩnh Long"],
  },
  {
    rank: 12,
    flag: "🇻🇳",
    shortName: "DUT",
    fullName: "Đại học Bách khoa – Đại học Đà Nẵng",
    founded: "1975",
    city: "Đà Nẵng",
    type: "Công lập",
    majors: "Kỹ thuật – Kỹ sư",
    majorCount: "+12",
    programs: "50",
    description: "Trường kỹ thuật trọng điểm miền Trung, đào tạo kỹ sư các ngành công nghệ và kỹ thuật.",
    category: "Kỹ thuật – Kỹ sư",
    subcategory: "Công lập",
    updatedAt: "2023-10-15",
    topFaculties: ["Khoa CNTT", "Khoa Xây dựng", "Khoa Cơ khí"],
    campuses: ["Đà Nẵng"],
  },
  {
    rank: 13,
    flag: "🇻🇳",
    shortName: "TDTU",
    fullName: "Đại học Tôn Đức Thắng",
    founded: "1997",
    city: "Hồ Chí Minh",
    type: "Công lập",
    majors: "Công nghệ thông tin",
    majorCount: "+13",
    programs: "55",
    description: "Trường đại học công lập tự chủ, nằm trong top các trường đại học tốt nhất Việt Nam theo bảng xếp hạng quốc tế.",
    category: "Công nghệ thông tin",
    subcategory: "Công lập",
    updatedAt: "2024-01-08",
    topFaculties: ["Khoa CNTT", "Khoa Kỹ thuật", "Khoa Kinh tế"],
    campuses: ["Hồ Chí Minh"],
  },
  {
    rank: 14,
    flag: "🇻🇳",
    shortName: "HCMUTE",
    fullName: "Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh",
    founded: "1962",
    city: "Hồ Chí Minh",
    type: "Công lập",
    majors: "Kỹ thuật – Kỹ sư",
    majorCount: "+10",
    programs: "48",
    description: "Trường chuyên đào tạo kỹ sư và giáo viên kỹ thuật, nổi bật với chương trình kỹ thuật ứng dụng.",
    category: "Kỹ thuật – Kỹ sư",
    subcategory: "Công lập",
    updatedAt: "2023-08-01",
    topFaculties: ["Khoa Điện – Điện tử", "Khoa Cơ khí", "Khoa CNTT"],
    campuses: ["Hồ Chí Minh"],
  },
  {
    rank: 15,
    flag: "🇻🇳",
    shortName: "VLU",
    fullName: "Đại học Văn Lang",
    founded: "1995",
    city: "Hồ Chí Minh",
    type: "Tư thục",
    majors: "Nghệ thuật – Thiết kế",
    majorCount: "+9",
    programs: "40",
    description: "Trường đại học tư thục đa ngành, nổi tiếng với các ngành thiết kế, kiến trúc và thời trang.",
    category: "Nghệ thuật – Thiết kế",
    subcategory: "Tư thục",
    updatedAt: "2023-07-20",
    topFaculties: ["Khoa Thiết kế", "Khoa Kiến trúc", "Khoa Thời trang"],
    campuses: ["Hồ Chí Minh"],
  },
  {
    rank: 16,
    flag: "🇻🇳",
    shortName: "HUL",
    fullName: "Đại học Luật Hà Nội",
    founded: "1979",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Luật – Xã hội",
    majorCount: "+5",
    programs: "15",
    description: "Trường đào tạo luật hàng đầu phía Bắc, cung cấp nhân lực pháp lý cho hệ thống tư pháp quốc gia.",
    category: "Luật – Xã hội",
    subcategory: "Công lập",
    updatedAt: "2023-06-01",
    topFaculties: ["Khoa Luật Dân sự", "Khoa Luật Hình sự", "Khoa Luật Quốc tế"],
    campuses: ["Hà Nội"],
  },
  {
    rank: 17,
    flag: "🇻🇳",
    shortName: "HUFLIT",
    fullName: "Đại học Ngoại ngữ – Tin học TP. Hồ Chí Minh",
    founded: "1994",
    city: "Hồ Chí Minh",
    type: "Tư thục",
    majors: "Công nghệ thông tin",
    majorCount: "+6",
    programs: "25",
    description: "Trường tư thục chuyên về ngoại ngữ và tin học, đào tạo nguồn nhân lực hội nhập quốc tế.",
    category: "Công nghệ thông tin",
    subcategory: "Tư thục",
    updatedAt: "2023-09-10",
    topFaculties: ["Khoa Tiếng Anh", "Khoa CNTT", "Khoa Nhật ngữ"],
    campuses: ["Hồ Chí Minh"],
  },
  {
    rank: 18,
    flag: "🇻🇳",
    shortName: "HUA",
    fullName: "Học viện Nông nghiệp Việt Nam",
    founded: "1956",
    city: "Hà Nội",
    type: "Công lập",
    majors: "Khoa học tự nhiên",
    majorCount: "+8",
    programs: "38",
    description: "Trường đào tạo nông nghiệp hàng đầu Việt Nam, chuyên về nông – lâm – thủy sản và môi trường.",
    category: "Khoa học tự nhiên",
    subcategory: "Công lập",
    updatedAt: "2023-12-15",
    topFaculties: ["Khoa Nông học", "Khoa Thú y", "Khoa Thủy sản"],
    campuses: ["Hà Nội", "Hưng Yên"],
  },
  {
    rank: 19,
    flag: "🇻🇳",
    shortName: "RMIT-VN",
    fullName: "Đại học RMIT Việt Nam",
    founded: "2001",
    city: "Hồ Chí Minh",
    type: "Tư thục",
    majors: "Kinh tế – Quản trị",
    majorCount: "+5",
    programs: "20",
    description: "Cơ sở giáo dục quốc tế của Đại học RMIT Úc tại Việt Nam, giảng dạy hoàn toàn bằng tiếng Anh.",
    category: "Kinh tế – Quản trị",
    subcategory: "Tư thục",
    updatedAt: "2024-02-01",
    topFaculties: ["Khoa Kinh doanh", "Khoa CNTT", "Khoa Thiết kế"],
    campuses: ["Hồ Chí Minh", "Hà Nội"],
  },
  {
    rank: 20,
    flag: "🇻🇳",
    shortName: "PTI",
    fullName: "Đại học Phenikaa",
    founded: "2019",
    city: "Hà Nội",
    type: "Tư thục",
    majors: "Công nghệ thông tin",
    majorCount: "+7",
    programs: "28",
    description: "Trường đại học tư thục định hướng nghiên cứu, thuộc tập đoàn Phenikaa, mạnh về STEM và AI.",
    category: "Công nghệ thông tin",
    subcategory: "Tư thục",
    updatedAt: "2023-05-20",
    topFaculties: ["Khoa CNTT", "Khoa Kỹ thuật", "Khoa Khoa học cơ bản"],
    campuses: ["Hà Nội"],
  },
];

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function getCategoryClass(category: string) {
  if (category === "Kỹ thuật – Kỹ sư") {
    return styles.chipApplications;
  }

  if (category === "Kinh tế – Quản trị") {
    return styles.chipLists;
  }

  return styles.chipEngineering;
}

function StatChip({ icon, value, label }: Stat) {
  return (
    <div className={styles.headerChip}>
      <span className={styles.chipEmoji}>{icon}</span>
      <span className={styles.chipText}>
        <span className={styles.chipValue}>{value}</span>
        <span className={styles.chipLabel}>{label}</span>
      </span>
    </div>
  );
}

function HeaderTab({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`${styles.tab} ${active ? styles.tabActive : ""}`.trim()}
    >
      {label}
    </a>
  );
}

function CategoryDropdown() {
  return (
    <details className={styles.multiSelectDropdown}>
      <summary className={styles.multiSelectBtn}>
        <span>Categories</span>
        <span className={styles.selectedCount}>8</span>
      </summary>
      <div className={styles.multiSelectMenu}>
        {categories.map((category) => (
          <label key={category.label} className={styles.multiSelectOption}>
            <input type="checkbox" defaultChecked className={styles.checkbox} />
            <span
              className={styles.colorDot}
              style={{ backgroundColor: category.color }}
            />
            <span className={styles.optionLabel}>{category.label}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

function UniTableRow({ row }: { row: UniRow }) {
  return (
    <tr className={styles.row}>
      <td className={`${styles.td} ${styles.stickyRank}`}>{row.rank}</td>
      <td className={`${styles.td} ${styles.stickyFlag}`}>{row.flag ?? ""}</td>
      <td className={`${styles.td} ${styles.stickyRepo}`}>
        <div className={styles.repoCell}>
          <div className={styles.repoOwner}>{row.shortName}</div>
          <div className={styles.repoName}>{row.fullName}</div>
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.growthCell}>
          <div className={styles.positive}>{row.programs}</div>
          <div className={styles.positiveSub}>chương trình</div>
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.growthCell}>
          <div className={styles.positive}>{row.city}</div>
        </div>
      </td>
      <td className={styles.td}>{row.founded}</td>
      <td className={styles.td}>
        <div className={styles.descCell}>{row.description}</div>
      </td>
      <td className={styles.td}>
        <span className={`${styles.chip} ${getCategoryClass(row.category)}`}>
          {row.category}
        </span>
      </td>
      <td className={styles.td}>
        <span className={`${styles.chip} ${styles.chipMuted}`}>
          {row.subcategory}
        </span>
      </td>
      <td className={`${styles.td} ${styles.dateCell}`}>
        {formatDate(row.updatedAt)}
      </td>
      <td className={styles.td}>
        <div className={styles.chips}>
          {row.topFaculties.map((faculty) => (
            <span key={`${row.shortName}-${faculty}`} className={`${styles.chip} ${styles.chipMuted}`}>
              {faculty}
            </span>
          ))}
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.chips}>
          {row.campuses.map((campus) => (
            <span key={`${row.shortName}-${campus}`} className={`${styles.chip} ${styles.chipMuted}`}>
              {campus}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.headerLeft}>
            <a href="#" className={styles.logoLink} aria-label="Danh sách đại học Việt Nam">
              <span className={styles.logoText}>🎓 Đại học VN</span>
            </a>
            <p className={styles.subtitle}>
              Tìm thông tin trường đại học Việt Nam dễ dàng
            </p>
          </div>

          <div className={styles.headerRight}>
            {stats.map((stat) => (
              <StatChip key={stat.label} {...stat} />
            ))}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <nav className={styles.tabsBar}>
        <div className={styles.tabs}>
          {primaryTabs.map((tab) => (
            <HeaderTab key={tab} label={tab} active={tab === "Trường"} />
          ))}
        </div>
        <div className={styles.tabsActions}>
          {secondaryTabs.map((tab) => (
            <HeaderTab key={tab} label={tab} />
          ))}
        </div>
      </nav>

      <main className={styles.main}>
        <section>
          <div className={styles.controlsRow}>
            <div className={styles.controls}>
              <input
                type="text"
                placeholder="Tìm kiếm trường đại học..."
                className={styles.input}
              />
              <CategoryDropdown />
              <select className={`${styles.input} ${styles.select}`}>
                <option>Tất cả tỉnh thành</option>
                <option>Hà Nội</option>
                <option>Hồ Chí Minh</option>
                <option>Đà Nẵng</option>
                <option>Cần Thơ</option>
              </select>
            </div>

            <div className={styles.pagination}>
              <button type="button" className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}>
                «
              </button>
              <span className={styles.pageInfo}>
                <span className={styles.pageInfoCurrent}>1</span> /{" "}
                <span className={styles.pageInfoCurrent}>9</span>
              </span>
              <span className={styles.pageInfo}>(20 trường)</span>
              <button type="button" className={styles.pageBtn}>
                »
              </button>
              <select className={styles.pageSizeSelect} defaultValue="100">
                <option>50</option>
                <option>100</option>
                <option>200</option>
                <option>500</option>
              </select>
            </div>
          </div>

          <div className={styles.tableScrollWrapper}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={`${styles.th} ${styles.stickyRank}`}>#</th>
                    <th className={`${styles.th} ${styles.stickyFlag}`} />
                    <th className={`${styles.th} ${styles.stickyRepo}`}>Trường</th>
                    <th className={styles.th}>Chương trình ↓</th>
                    <th className={styles.th}>Thành phố</th>
                    <th className={styles.th}>Năm thành lập</th>
                    <th className={styles.th}>Mô tả</th>
                    <th className={styles.th}>Lĩnh vực</th>
                    <th className={styles.th}>Loại trường</th>
                    <th className={styles.th}>Cập nhật</th>
                    <th className={styles.th}>Khoa tiêu biểu</th>
                    <th className={styles.th}>Campus</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <UniTableRow key={row.rank} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
