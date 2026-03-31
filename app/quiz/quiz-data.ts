export type CareerTrackKey =
  | "technology"
  | "engineering"
  | "business"
  | "health"
  | "educationSocial"
  | "lawPublic"
  | "designMedia"
  | "serviceHospitality";

export type CareerTrack = {
  key: CareerTrackKey;
  title: string;
  shortTitle: string;
  summary: string;
  majors: string[];
  strengths: string[];
  workStyle: string[];
  caution: string;
  color: string;
};

export type QuizOption = {
  label: string;
  description: string;
  impacts: Partial<Record<CareerTrackKey, number>>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  helper: string;
  options: QuizOption[];
};

export const careerTracks: CareerTrack[] = [
  {
    key: "technology",
    title: "CNTT, AI, dữ liệu và sản phẩm số",
    shortTitle: "CNTT - AI",
    summary:
      "Phù hợp với người thích tư duy hệ thống, giải quyết vấn đề bằng logic và kiên nhẫn tối ưu từng chi tiết.",
    majors: ["Khoa học máy tính", "Trí tuệ nhân tạo", "Kỹ thuật phần mềm", "Khoa học dữ liệu"],
    strengths: ["Tư duy logic", "Tự học nhanh", "Làm việc với dữ liệu, thuật toán và hệ thống"],
    workStyle: ["Môi trường sản phẩm số", "Nhóm kỹ thuật", "Công việc cần thử nghiệm, tối ưu và cập nhật công nghệ liên tục"],
    caution:
      "Nghề này cần cập nhật công nghệ thường xuyên; nếu không thích ngồi sâu giải quyết vấn đề trong thời gian dài thì nên cân nhắc thêm.",
    color: "#2563eb",
  },
  {
    key: "engineering",
    title: "Kỹ thuật, công nghệ và vận hành",
    shortTitle: "Kỹ thuật",
    summary:
      "Hợp với người thích biến ý tưởng thành hệ thống thật, quan tâm máy móc, quy trình, sản xuất hoặc hạ tầng.",
    majors: ["Cơ điện tử", "Điện - Điện tử", "Tự động hóa", "Kỹ thuật xây dựng"],
    strengths: ["Thực hành tốt", "Kiên trì", "Tư duy quy trình và tối ưu vận hành"],
    workStyle: ["Nhà máy và phòng lab", "Dự án kỹ thuật", "Công việc gắn với tiêu chuẩn và an toàn"],
    caution:
      "Một số ngành kỹ thuật có cường độ học nặng, thiên về toán - lý và yêu cầu chịu áp lực deadline triển khai thực tế.",
    color: "#0f766e",
  },
  {
    key: "business",
    title: "Kinh doanh, marketing, tài chính và quản trị",
    shortTitle: "Kinh doanh",
    summary:
      "Phù hợp với người thích mục tiêu rõ ràng, quan tâm thị trường, con số, hiệu quả tổ chức và tăng trưởng.",
    majors: ["Quản trị kinh doanh", "Marketing số", "Thương mại điện tử", "Tài chính - Ngân hàng"],
    strengths: ["Nhạy với cơ hội", "Giao tiếp tốt", "Ra quyết định theo mục tiêu, tăng trưởng và hiệu quả"],
    workStyle: ["Môi trường doanh nghiệp", "Làm việc với khách hàng hoặc đội nhóm", "Bài toán tăng trưởng, thương hiệu và tối ưu doanh thu"],
    caution:
      "Nếu anh/chị không thích KPI, cạnh tranh hoặc nhịp làm việc nhanh thì nên cân bằng với các nhóm ngành ổn định hơn.",
    color: "#db2777",
  },
  {
    key: "health",
    title: "Sức khỏe, y dược và chăm sóc con người",
    shortTitle: "Y - Dược",
    summary:
      "Nhóm này hợp với người có tinh thần trách nhiệm cao, cẩn thận và chấp nhận quá trình đào tạo dài, chuẩn hóa nghiêm ngặt.",
    majors: ["Y khoa", "Dược học", "Điều dưỡng", "Kỹ thuật xét nghiệm y học"],
    strengths: ["Tính kỷ luật", "Sự cẩn trọng", "Động lực phục vụ con người"],
    workStyle: ["Bệnh viện và cơ sở y tế", "Môi trường quy trình chặt chẽ", "Công việc ảnh hưởng trực tiếp tới người khác"],
    caution:
      "Đây là nhóm ngành đòi hỏi thời gian học dài, áp lực lớn và yêu cầu chịu trách nhiệm rất cao trong công việc.",
    color: "#dc2626",
  },
  {
    key: "educationSocial",
    title: "Giáo dục, tâm lý và khoa học xã hội",
    shortTitle: "Giáo dục - XH",
    summary:
      "Hợp với người thích đồng hành cùng người khác, giải thích dễ hiểu và quan tâm tới hành vi, cộng đồng, tác động xã hội.",
    majors: ["Sư phạm", "Tâm lý học", "Công tác xã hội", "Xã hội học"],
    strengths: ["Lắng nghe tốt", "Kiên nhẫn", "Quan sát và thấu hiểu con người"],
    workStyle: ["Làm việc với học sinh, phụ huynh hoặc cộng đồng", "Môi trường có ý nghĩa xã hội", "Cần giao tiếp bền bỉ"],
    caution:
      "Nếu anh/chị chỉ thích kết quả nhanh và ít tương tác con người thì nhóm này có thể không tạo nhiều năng lượng lâu dài.",
    color: "#7c3aed",
  },
  {
    key: "lawPublic",
    title: "Luật, chính sách, compliance và hành chính công",
    shortTitle: "Luật - Công",
    summary:
      "Phù hợp với người thích lập luận chặt, công bằng, quy định rõ ràng và có khả năng đọc hiểu, phân tích văn bản tốt.",
    majors: ["Luật", "Luật kinh doanh", "Luật thương mại quốc tế", "Hành chính công"],
    strengths: ["Lập luận mạch lạc", "Tư duy phản biện", "Tôn trọng nguyên tắc, chuẩn mực và rủi ro pháp lý"],
    workStyle: ["Làm việc với hồ sơ và quy định", "Môi trường cần chuẩn xác", "Vai trò tư vấn, kiểm soát, pháp chế hoặc hoạch định"],
    caution:
      "Nhóm này hợp với người chịu được khối lượng đọc lớn và không ngại sự chặt chẽ về thủ tục, quy trình và ngôn ngữ pháp lý.",
    color: "#475569",
  },
  {
    key: "designMedia",
    title: "Thiết kế, truyền thông và sáng tạo nội dung",
    shortTitle: "Thiết kế - Media",
    summary:
      "Hợp với người giàu ý tưởng, nhạy về hình ảnh hoặc câu chuyện, thích tạo sản phẩm có dấu ấn cá nhân và tác động cảm xúc.",
    majors: ["Thiết kế đồ họa", "Truyền thông đa phương tiện", "Thiết kế UI/UX", "Sáng tạo nội dung"],
    strengths: ["Sáng tạo", "Kể chuyện tốt", "Nhạy thẩm mỹ, thương hiệu và trải nghiệm người dùng"],
    workStyle: ["Làm việc theo dự án", "Môi trường linh hoạt", "Cần vừa sáng tạo vừa tiếp thu feedback và dữ liệu người dùng"],
    caution:
      "Đây là nhóm dễ bị hiểu nhầm là chỉ cần cảm hứng; thực tế cần kỷ luật, portfolio tốt và chịu được vòng sửa nhiều lần.",
    color: "#ea580c",
  },
  {
    key: "serviceHospitality",
    title: "Dịch vụ, du lịch và trải nghiệm khách hàng",
    shortTitle: "Dịch vụ",
    summary:
      "Phù hợp với người năng động, ưa tương tác, xử lý tình huống tốt và thích mang lại trải nghiệm tích cực cho người khác.",
    majors: ["Quản trị khách sạn", "Du lịch", "Hàng không", "Quản trị dịch vụ"],
    strengths: ["Giao tiếp linh hoạt", "Xử lý tình huống", "Giữ năng lượng tốt khi làm việc với nhiều người"],
    workStyle: ["Môi trường dịch vụ", "Nhịp làm việc linh hoạt", "Cần phối hợp đa bộ phận"],
    caution:
      "Nếu anh/chị thích lịch làm việc quá cố định hoặc ít giao tiếp, nhóm ngành dịch vụ có thể khiến mình nhanh mệt.",
    color: "#16a34a",
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "Khi gặp một vấn đề khó, anh/chị thường thấy mình hứng thú nhất với kiểu xử lý nào?",
    helper: "Câu này đo thiên hướng tư duy cốt lõi khi học và làm việc.",
    options: [
      {
        label: "Bóc tách nguyên nhân rồi tìm lời giải logic",
        description: "Thích lần theo từng bước, kiểm tra giả thuyết và tối ưu cách làm.",
        impacts: { technology: 3, engineering: 2, lawPublic: 1 },
      },
      {
        label: "Quan sát người liên quan rồi tìm cách hỗ trợ phù hợp",
        description: "Quan tâm cảm xúc, hoàn cảnh và tác động tới con người.",
        impacts: { educationSocial: 3, health: 2, serviceHospitality: 1 },
      },
      {
        label: "Nghĩ cách biến nó thành cơ hội hoặc kết quả tốt hơn",
        description: "Tự nhiên nhìn vấn đề dưới góc hiệu quả, thị trường hoặc lợi ích.",
        impacts: { business: 3, serviceHospitality: 2, designMedia: 1 },
      },
      {
        label: "Tìm một hướng mới lạ hơn, trình bày hấp dẫn hơn",
        description: "Hứng thú với ý tưởng, trải nghiệm và cách thể hiện khác biệt.",
        impacts: { designMedia: 3, technology: 1, business: 1 },
      },
    ],
  },
  {
    id: "q2",
    prompt: "Trong các môn học, nhóm nào thường khiến anh/chị vào guồng nhanh nhất?",
    helper: "Không phải để chọn môn tuyệt đối, mà để nhìn thiên hướng học tự nhiên.",
    options: [
      {
        label: "Toán, Tin, AI hoặc các bài logic",
        description: "Thấy vui khi giải bài khó, viết code, làm dữ liệu hoặc tìm ra quy luật.",
        impacts: { technology: 3, engineering: 2 },
      },
      {
        label: "Lý, Công nghệ, thí nghiệm và mô hình",
        description: "Thích nguyên lý vận hành và làm việc với hệ thống thật.",
        impacts: { engineering: 3, technology: 1, health: 1 },
      },
      {
        label: "Văn, Sử, GDCD, các chủ đề xã hội",
        description: "Thích phân tích con người, bối cảnh và lập luận bằng ngôn ngữ.",
        impacts: { lawPublic: 2, educationSocial: 3, designMedia: 1 },
      },
      {
        label: "Các môn gắn với giao tiếp, thuyết trình, marketing hoặc làm dự án",
        description: "Có năng lượng khi trao đổi, tổ chức, thuyết phục hoặc xây ý tưởng tăng trưởng.",
        impacts: { business: 2, serviceHospitality: 2, designMedia: 2 },
      },
    ],
  },
  {
    id: "q3",
    prompt: "Kiểu môi trường làm việc nào làm anh/chị thấy có động lực lâu dài nhất?",
    helper: "Mỗi ngành có nhịp vận hành khác nhau, nên câu này khá quan trọng.",
    options: [
      {
        label: "Không gian tập trung sâu, ít bị ngắt quãng",
        description: "Có thời gian nghĩ kỹ, làm việc sâu với vấn đề hoặc hệ thống.",
        impacts: { technology: 3, lawPublic: 1, designMedia: 1 },
      },
      {
        label: "Môi trường có quy trình rõ và tiêu chuẩn chặt",
        description: "Làm đúng chuẩn, đúng bước khiến mình yên tâm hơn.",
        impacts: { health: 3, engineering: 2, lawPublic: 2 },
      },
      {
        label: "Môi trường năng động, có người và có nhịp thay đổi liên tục",
        description: "Thích va chạm thực tế, phản hồi nhanh và mục tiêu rõ.",
        impacts: { business: 3, serviceHospitality: 2, designMedia: 1 },
      },
      {
        label: "Môi trường mở, nhiều ý tưởng và được thử cách mới",
        description: "Có không gian sáng tạo khiến mình bật năng lượng.",
        impacts: { designMedia: 3, technology: 1, educationSocial: 1 },
      },
    ],
  },
  {
    id: "q4",
    prompt: "Nếu phải chọn một dạng giá trị mình muốn tạo ra sau này, anh/chị nghiêng về điều gì nhất?",
    helper: "Câu này nhìn vào động lực nghề nghiệp dài hạn.",
    options: [
      {
        label: "Tạo ra sản phẩm số, công cụ AI hoặc hệ thống hữu ích",
        description: "Muốn thứ mình làm có thể vận hành tốt, tự động hóa hoặc dùng được thật.",
        impacts: { technology: 2, engineering: 3 },
      },
      {
        label: "Cải thiện cuộc sống, sức khỏe hoặc sự phát triển của người khác",
        description: "Muốn công việc của mình có tác động trực tiếp tới con người.",
        impacts: { health: 3, educationSocial: 3 },
      },
      {
        label: "Tạo tăng trưởng, cơ hội hoặc hiệu quả cho tổ chức",
        description: "Muốn nhìn thấy kết quả thông qua hiệu suất và mục tiêu.",
        impacts: { business: 3, serviceHospitality: 1 },
      },
      {
        label: "Tạo ảnh hưởng về nhận thức, cảm xúc hoặc trải nghiệm",
        description: "Muốn người khác hiểu, cảm hoặc nhớ tới điều mình tạo ra.",
        impacts: { designMedia: 3, lawPublic: 1, serviceHospitality: 1 },
      },
    ],
  },
  {
    id: "q5",
    prompt: "Anh/chị phản ứng thế nào với áp lực trách nhiệm cao?",
    helper: "Một số ngành không chỉ khó mà còn yêu cầu chịu trách nhiệm trực tiếp.",
    options: [
      {
        label: "Ổn nếu có quy trình rõ và mình được chuẩn bị kỹ",
        description: "Không ngại áp lực miễn là tiêu chuẩn, quy tắc và nguồn lực rõ ràng.",
        impacts: { health: 3, engineering: 2, lawPublic: 2 },
      },
      {
        label: "Ổn nếu đó là bài toán cần phân tích và giải quyết",
        description: "Áp lực làm mình tập trung hơn nếu vấn đề có logic.",
        impacts: { technology: 3, engineering: 1, business: 1 },
      },
      {
        label: "Ổn nếu được phối hợp nhiều người để cùng xử lý",
        description: "Thấy mình mạnh hơn khi có teamwork và giao tiếp liên tục.",
        impacts: { business: 2, serviceHospitality: 2, educationSocial: 2 },
      },
      {
        label: "Mình không thích áp lực quá cứng; cần không gian linh hoạt hơn",
        description: "Làm tốt hơn khi được tự do điều chỉnh cách tiếp cận.",
        impacts: { designMedia: 2, educationSocial: 1, serviceHospitality: 1 },
      },
    ],
  },
  {
    id: "q6",
    prompt: "Khi làm bài hoặc làm dự án nhóm, vai trò nào thường tự nhiên rơi vào anh/chị?",
    helper: "Vai trò quen thuộc thường phản ánh sở trường khá rõ.",
    options: [
      {
        label: "Người dựng cấu trúc, phân tích lỗi và chốt cách làm",
        description: "Thiên về giải pháp, framework và logic triển khai.",
        impacts: { technology: 3, engineering: 2, lawPublic: 1 },
      },
      {
        label: "Người điều phối tiến độ, chiến lược và giữ mục tiêu chung",
        description: "Quan tâm kết quả, phân công, hiệu quả làm việc và tăng trưởng tổng thể.",
        impacts: { business: 3, serviceHospitality: 1, lawPublic: 1 },
      },
      {
        label: "Người lắng nghe, nối mọi người lại với nhau",
        description: "Nhạy với tâm lý nhóm và giúp mọi người làm việc êm hơn.",
        impacts: { educationSocial: 3, serviceHospitality: 2, health: 1 },
      },
      {
        label: "Người nghĩ concept, cách kể chuyện hoặc cách trình bày",
        description: "Hay nhìn ra góc tiếp cận mới hoặc cách thể hiện hấp dẫn hơn.",
        impacts: { designMedia: 3, business: 1 },
      },
    ],
  },
  {
    id: "q7",
    prompt: "Anh/chị có thấy hứng thú với dữ liệu, báo cáo, số liệu và chỉ số không?",
    helper: "Đây là một chỉ báo mạnh cho nhiều nhóm ngành khác nhau.",
    options: [
      {
        label: "Rất hứng thú, nhất là dữ liệu có thể dùng để dự báo hoặc tối ưu",
        description: "Thích đào sâu số liệu, dashboard, pattern hoặc logic của mô hình.",
        impacts: { technology: 2, business: 3, engineering: 1 },
      },
      {
        label: "Có, nếu dữ liệu phục vụ quyết định thực tế",
        description: "Không cần quá kỹ thuật nhưng thích số liệu có ích.",
        impacts: { business: 2, lawPublic: 1, health: 1 },
      },
      {
        label: "Vừa phải, mình hợp dữ liệu khi gắn với con người hoặc bối cảnh",
        description: "Muốn số liệu đi cùng câu chuyện hoặc tác động xã hội.",
        impacts: { educationSocial: 2, serviceHospitality: 1, designMedia: 1 },
      },
      {
        label: "Không phải phần mình thích nhất",
        description: "Mình thiên về ý tưởng, trải nghiệm hoặc tương tác hơn.",
        impacts: { designMedia: 2, serviceHospitality: 2, educationSocial: 1 },
      },
    ],
  },
  {
    id: "q8",
    prompt: "Nếu phải học rất dài và liên tục cập nhật chuẩn chuyên môn, anh/chị thấy sao?",
    helper: "Một số ngành cần vòng học tập dài và cập nhật không ngừng.",
    options: [
      {
        label: "Sẵn sàng, miễn là công việc có ý nghĩa và chuẩn nghề rõ",
        description: "Chấp nhận đường dài nếu đầu ra đáng để theo đuổi.",
        impacts: { health: 3, lawPublic: 2, engineering: 1 },
      },
      {
        label: "Ổn, nếu mình nhìn thấy kỹ năng tăng lên rất rõ",
        description: "Không ngại học nhiều khi thấy bản thân lên tay từng giai đoạn.",
        impacts: { technology: 2, engineering: 2, designMedia: 1 },
      },
      {
        label: "Thích học nhưng muốn linh hoạt và thực chiến hơn",
        description: "Ưa học qua dự án, thực hành, tình huống thật.",
        impacts: { business: 2, serviceHospitality: 2, designMedia: 1 },
      },
      {
        label: "Không hợp lắm với lộ trình quá dài và cứng",
        description: "Muốn sớm va chạm công việc và điều chỉnh theo trải nghiệm.",
        impacts: { serviceHospitality: 2, designMedia: 2, business: 1 },
      },
    ],
  },
  {
    id: "q9",
    prompt: "Khi nghe một người khác trình bày quan điểm sai hoặc thiếu chặt, anh/chị thường làm gì?",
    helper: "Câu này đo phong cách phản biện và cách dùng ngôn ngữ/lý lẽ.",
    options: [
      {
        label: "Chỉ ra logic chưa ổn, phản biện lại từng điểm và truy tới căn cứ",
        description: "Tự nhiên thích lập luận rõ, luật lệ rõ và không bỏ qua điểm mâu thuẫn.",
        impacts: { lawPublic: 3, technology: 1, business: 1 },
      },
      {
        label: "Hỏi thêm để hiểu bối cảnh rồi mới phản hồi",
        description: "Ưu tiên hiểu con người và tình huống trước.",
        impacts: { educationSocial: 3, health: 1, serviceHospitality: 1 },
      },
      {
        label: "Xem điều đó ảnh hưởng kết quả chung ra sao",
        description: "Quan tâm chuyện gì giúp nhóm tiến nhanh và hiệu quả hơn.",
        impacts: { business: 3, engineering: 1, serviceHospitality: 1 },
      },
      {
        label: "Tìm cách nói lại sao cho dễ hiểu và dễ chấp nhận hơn",
        description: "Chú ý cách truyền đạt, cảm nhận và sức thuyết phục.",
        impacts: { designMedia: 2, educationSocial: 1, serviceHospitality: 2 },
      },
    ],
  },
  {
    id: "q10",
    prompt: "Anh/chị thích làm việc gần với điều gì nhất?",
    helper: "Đây là câu hỏi trực diện về đối tượng công việc anh/chị thấy hợp.",
    options: [
      {
        label: "Máy móc, phần mềm, AI, tự động hóa hoặc quy trình kỹ thuật",
        description: "Thích thứ có thể phân tích, thiết kế, tối ưu, kiểm thử và cải tiến liên tục.",
        impacts: { technology: 3, engineering: 3 },
      },
      {
        label: "Con người, cảm xúc, nhu cầu học tập hoặc sức khỏe",
        description: "Thấy có ý nghĩa khi giúp người khác tốt lên.",
        impacts: { health: 2, educationSocial: 3, serviceHospitality: 1 },
      },
      {
        label: "Thị trường, khách hàng, doanh nghiệp, thương hiệu hoặc tiền",
        description: "Hứng thú với vận hành kinh doanh, marketing và kết quả cụ thể.",
        impacts: { business: 3, serviceHospitality: 2 },
      },
      {
        label: "Thông điệp, hình ảnh, trải nghiệm hoặc câu chuyện",
        description: "Thích tạo thứ có tính biểu đạt và ảnh hưởng nhận thức.",
        impacts: { designMedia: 3, lawPublic: 1 },
      },
    ],
  },
  {
    id: "q11",
    prompt: "Nếu phải chọn giữa ổn định và thử thách, anh/chị nghiêng về bên nào hơn?",
    helper: "Không có đáp án tốt xấu, chỉ là hợp nghề nào hơn.",
    options: [
      {
        label: "Ưa ổn định, chuẩn mực và lộ trình rõ",
        description: "Thích biết mình đang đi đâu và theo chuẩn nào.",
        impacts: { health: 2, lawPublic: 3, educationSocial: 1 },
      },
      {
        label: "Ưa thử thách kỹ thuật hoặc bài toán khó",
        description: "Không cần quá ồn ào, chỉ cần bài toán đủ khó để giải.",
        impacts: { technology: 3, engineering: 2 },
      },
      {
        label: "Ưa môi trường cạnh tranh, tăng trưởng nhanh",
        description: "Có năng lượng khi được bứt tốc và đo kết quả rõ ràng.",
        impacts: { business: 3, serviceHospitality: 2 },
      },
      {
        label: "Ưa sự linh hoạt, mới mẻ và không gian thể hiện cá tính",
        description: "Muốn vừa làm vừa thử, vừa điều chỉnh phong cách riêng.",
        impacts: { designMedia: 3, serviceHospitality: 1 },
      },
    ],
  },
  {
    id: "q12",
    prompt: "Anh/chị thấy mình có kiên nhẫn với chi tiết và độ chính xác đến mức nào?",
    helper: "Nhiều nghề cần sự chính xác rất cao, nhưng không phải ai cũng thích kiểu đó.",
    options: [
      {
        label: "Rất cao, mình khá khó chịu khi có sai sót",
        description: "Thường rà kỹ, ít bỏ qua chi tiết quan trọng.",
        impacts: { health: 3, lawPublic: 2, engineering: 2 },
      },
      {
        label: "Cao khi nó ảnh hưởng trực tiếp tới chất lượng sản phẩm",
        description: "Không cầu toàn mọi thứ, nhưng kỹ khi liên quan kết quả.",
        impacts: { technology: 2, engineering: 2, business: 1 },
      },
      {
        label: "Vừa phải, mình mạnh hơn ở giao tiếp và xử lý tình huống",
        description: "Linh hoạt hơn là soi chi tiết quá sâu.",
        impacts: { serviceHospitality: 2, educationSocial: 1, business: 1 },
      },
      {
        label: "Mình ưu tiên ý tưởng lớn và trải nghiệm tổng thể hơn",
        description: "Thường nhìn bức tranh chung trước chi tiết nhỏ.",
        impacts: { designMedia: 2, business: 1 },
      },
    ],
  },
  {
    id: "q13",
    prompt: "Một ngày làm việc lý tưởng của anh/chị sẽ có nhịp như thế nào?",
    helper: "Nhịp làm việc hợp mình thường quan trọng không kém nội dung công việc.",
    options: [
      {
        label: "Có khoảng tập trung sâu dài, ít họp, ít ngắt mạch",
        description: "Thích làm việc sâu với một vấn đề trong nhiều giờ.",
        impacts: { technology: 3, lawPublic: 1, designMedia: 1 },
      },
      {
        label: "Có thực hành, đo đạc, kiểm tra hoặc triển khai cụ thể",
        description: "Muốn công việc chạm vào thứ có thể vận hành được.",
        impacts: { engineering: 3, health: 1 },
      },
      {
        label: "Có nhiều tương tác, phối hợp, trao đổi với người khác",
        description: "Năng lượng đến từ va chạm và phối hợp liên tục.",
        impacts: { business: 2, serviceHospitality: 2, educationSocial: 2 },
      },
      {
        label: "Có lúc brainstorm, lúc làm concept, lúc chỉnh trải nghiệm",
        description: "Thích sự đa dạng và tính sáng tạo trong ngày làm việc.",
        impacts: { designMedia: 3, business: 1 },
      },
    ],
  },
  {
    id: "q14",
    prompt: "Khi đứng trước một quyết định quan trọng, anh/chị tin vào điều gì nhiều hơn?",
    helper: "Đây là câu nhìn vào kiểu ra quyết định của anh/chị.",
    options: [
      {
        label: "Logic, bằng chứng và dữ liệu đủ mạnh",
        description: "Thích có căn cứ rõ ràng trước khi chốt.",
        impacts: { technology: 2, engineering: 2, lawPublic: 2 },
      },
      {
        label: "Chuẩn chuyên môn, nguyên tắc và mức độ an toàn",
        description: "Ưu tiên quyết định đúng chuẩn và hạn chế rủi ro.",
        impacts: { health: 3, lawPublic: 2, engineering: 1 },
      },
      {
        label: "Tính hiệu quả, thời điểm và cơ hội",
        description: "Quan tâm quyết định nào giúp tiến xa hơn trong thực tế.",
        impacts: { business: 3, serviceHospitality: 1 },
      },
      {
        label: "Cảm nhận về con người, trải nghiệm và sự phù hợp",
        description: "Tin nhiều vào độ hợp với người dùng, người học hay khách hàng.",
        impacts: { educationSocial: 2, designMedia: 2, serviceHospitality: 2 },
      },
    ],
  },
  {
    id: "q15",
    prompt: "Nếu được chọn một kiểu thành tựu để tự hào sau 5-10 năm, anh/chị muốn điều gì nhất?",
    helper: "Câu cuối giúp kéo kết quả về mục tiêu dài hạn thay vì sở thích nhất thời.",
    options: [
      {
        label: "Xây được thứ khó, bền và có giá trị thực tế rõ ràng",
        description: "Tự hào vì đã tạo hoặc vận hành được hệ thống/sản phẩm chất lượng.",
        impacts: { engineering: 3, technology: 2 },
      },
      {
        label: "Được tin cậy vì chuyên môn sâu và trách nhiệm lớn",
        description: "Muốn người khác nể vì độ chắc nghề và sự đáng tin.",
        impacts: { health: 3, lawPublic: 2, educationSocial: 1 },
      },
      {
        label: "Dẫn dắt được kết quả, đội nhóm hoặc tăng trưởng tốt",
        description: "Muốn nhìn thấy ảnh hưởng của mình lên tổ chức và cơ hội mới.",
        impacts: { business: 3, serviceHospitality: 2 },
      },
      {
        label: "Tạo ra dấu ấn riêng và những trải nghiệm hoặc chiến dịch khiến người khác nhớ",
        description: "Muốn công việc mang bản sắc, có dấu ấn truyền thông hoặc sáng tạo rõ ràng.",
        impacts: { designMedia: 3, educationSocial: 1 },
      },
    ],
  },
];
