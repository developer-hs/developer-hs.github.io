const IMG_PATH = "/assets/imgs";

export const FEDetails = {
  skinnypig: {
    title: "스키니피그 홈페이지 전체 리뉴얼",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "CAFE24"],
    description: [
      "홈페이지 전체 리뉴얼",
      "IOS 저전력 모드시 동영상 -> 이미지 전환",
      "사용자 이탈율 감소를 위한 홈페이지 최적화",
    ],
    pc: [
      `${IMG_PATH}/skinnypig/details/pc/skn_pc_main`,
      `${IMG_PATH}/skinnypig/details/pc/skn_pc_prd_list`,
      `${IMG_PATH}/skinnypig/details/pc/skn_pc_prd_detail`,
    ],
    mob: [
      `${IMG_PATH}/skinnypig/details/mob/skn_mob_main`,
      `${IMG_PATH}/skinnypig/details/mob/skn_mob_prd_list`,
      `${IMG_PATH}/skinnypig/details/mob/skn_mob_prd_detail_wfull`,
    ],
    pcImgDescription: ["스키니피그 메인 페이지", "스키니피그 상품 리스트 페이지", "스키니피그 상품 상세 페이지"],
    site: {
      name: "스키니피그",
      url: "https://skinnypig.xyz/",
    },
  },
  olola: {
    title: "오로라렌즈 메인페이지 + 스토어픽업",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "CAFE24"],
    description: ["주요 페이지 퍼블리싱 및 기능 구현", "스토어 픽업 기능 구현"],
    pc: [
      `${IMG_PATH}/olola/details/pc/olola_main`,
      `${IMG_PATH}/olola/details/pc/olola_prd_pickup_wfull`,
      `${IMG_PATH}/olola/details/pc/olola_store_pickup`,
    ],
    mob: [
      `${IMG_PATH}/olola/details/mob/olola_main`,
      `${IMG_PATH}/olola/details/mob/olola_prd_pickup_wfull`,
      `${IMG_PATH}/olola/details/mob/olola_store_pickup`,
    ],
    pcImgDescription: [
      "오로라렌즈 메인 페이지",
      "오로라렌즈 상품 상세 스토어 픽업 페이지",
      "오로라렌즈 스토어 리스트 페이지",
    ],
    site: {
      name: "오로라렌즈",
      url: "https://o-lola.co.kr/",
    },
  },
  dragon: {
    title: "용훈샵 홈페이지 제작",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "CAFE24"],
    description: ["홈페이지 전체 제작"],
    pc: [
      `${IMG_PATH}/dragon/details/pc/dragon_pc_main`,
      `${IMG_PATH}/dragon/details/pc/dragon_pc_prd_list`,
      `${IMG_PATH}/dragon/details/pc/dragon_pc_estimate`,
      `${IMG_PATH}/dragon/details/pc/dragon_pc_guide`,
    ],
    mob: [
      `${IMG_PATH}/dragon/details/mob/dragon_mob_main`,
      `${IMG_PATH}/dragon/details/mob/dragon_mob_prd_list`,
      `${IMG_PATH}/dragon/details/mob/dragon_mob_estimate`,
      `${IMG_PATH}/dragon/details/mob/dragon_mob_guide`,
    ],
    pcImgDescription: [
      "용훈샵 메인 페이지",
      "용훈샵 상품 리스트 페이지",
      "용훈샵 견적요청 페이지",
      "용훈샵 견적 가이드 페이지",
    ],
    site: {
      name: "용훈샵",
      url: "https://dragon0808.cafe24.com/",
    },
  },
  smart: {
    title: "스마트마케팅 홈페이지 제작",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "CAFE24"],
    description: ["홈페이지 전체 제작"],
    pc: [
      `${IMG_PATH}/smart/details/pc/smart_pc_main`,
      `${IMG_PATH}/smart/details/pc/smart_pc_prd_list`,
      `${IMG_PATH}/smart/details/pc/smart_pc_about_1`,
      `${IMG_PATH}/smart/details/pc/smart_pc_about_2`,
    ],
    mob: [
      `${IMG_PATH}/smart/details/mob/smart_mob_main`,
      `${IMG_PATH}/smart/details/mob/smart_mob_prd_list`,
      `${IMG_PATH}/smart/details/mob/smart_mob_about_1`,
      `${IMG_PATH}/smart/details/mob/smart_mob_about_2`,
    ],
    pcImgDescription: [
      "스마트마케팅 메인 페이지",
      "스마트마케팅 상품 리스트 페이지",
      "스마트마케팅 대표 인사말 페이지",
      "스마트마케팅 회사 소개 페이지",
    ],
    site: {
      name: "스마트마케팅",
      url: "https://smartmarketingco.cafe24.com/",
    },
  },
  neoteria: {
    title: "네오테리아 홈페이지 제작",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "CAFE24"],
    description: [
      "홈페이지 전체 제작",
      "상품 정렬 구현",
      "스크롤 최하단 접근 시 새로운 상품 불러오기",
      "홈페이지 최적화",
    ],
    pc: [`${IMG_PATH}/neoteria/details/pc/neoteria_pc_main`, `${IMG_PATH}/neoteria/details/pc/neoteria_pc_prd_list`],
    mob: [
      `${IMG_PATH}/neoteria/details/mob/neoteria_mob_main`,
      `${IMG_PATH}/neoteria/details/mob/neoteria_mob_prd_list`,
    ],
    pcImgDescription: ["네오테리아 메인 페이지", "네오테리아 상품 리스트 페이지"],
    site: {
      name: "네오테리아",
      url: "https://neoteria.net/",
    },
  },
  vividgolf: {
    title: "비비드골프 멤버십 + 대여캘린더",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "CAFE24"],
    description: ["멤버십 페이지 제작", "대여 캘린더 구현", "멤버십 기능 연동"],
    pc: [`${IMG_PATH}/vividgolf/details/pc/vivid_pc_membership`, `${IMG_PATH}/vividgolf/details/pc/vivid_pc_calendar`],
    mob: [
      `${IMG_PATH}/vividgolf/details/mob/vivid_mob_membership`,
      `${IMG_PATH}/vividgolf/details/mob/vivid_mob_calendar`,
    ],
    pcImgDescription: ["비비드골프 멤버십 페이지", "비비드골프 상품 상세 대여일 설정 페이지"],

    site: {
      name: "비비드골프",
      url: "https://vividgolf.co.kr/",
    },
  },
};

export const BEDetails = {
  drlohas: {
    title: "닥터로하스 응모하기",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "AXIOS", "CALENDAR.JS", "CAFE24"],
    backStacks: ["NODE.JS", "EXPRESS.JS", "MONGOOSE", "RADIS", "GAE", "CLOUD SCHEDULER"],
    description: [
      "설정된 금액만큼 특정 상품 구매 시 응모권 지급",
      "경품에 응모 시 필요한 응모권 만큼 응모권 차감",
      "응모 관련 정보 어드민 페이지 제작",
    ],
    pc: [
      `${IMG_PATH}/drlohas/details/pc/drlohas_pc_main`,
      `${IMG_PATH}/drlohas/details/pc/drlohas_admin_main`,
      `${IMG_PATH}/drlohas/details/pc/drlohas_admin_figma`,
    ],
    mob: [],
    pcImgDescription: [
      "닥터로하스 이벤트 페이지",
      "닥터로하스 응모하기 어드민 페이지",
      "닥터로하스 응모하기 어드민 페이지 피그마",
    ],
    site: {
      name: "닥터로하스",
      url: "https://drlohas.kr/event/index.html",
    },
  },
  daenggogh: {
    title: "댕고흐 강아지 이미지 필터링 + 구글 드라이브 업로드",
    frontStacks: ["HTML", "CSS", "JAVASCRIPT", "AXIOS", "DROPZONE.JS", "CAFE24"],
    backStacks: ["NODE.JS", "EXPRESS.JS", "MONGOOSE", "DOCKER", "GCE", "GKE"],
    description: ["YOLOV5 를 이용한 강아지 이미지 필터링", "Google Drive Api 를 사용하여 이미지 파일 업로드"],
    pc: [
      `${IMG_PATH}/daenggogh/details/pc/daenggogh_pc_main`,
      `${IMG_PATH}/daenggogh/details/pc/daenggogh_pc_pending`,
      `${IMG_PATH}/daenggogh/details/pc/daenggogh_pc_upload`,
    ],
    mob: [
      `${IMG_PATH}/daenggogh/details/mob/daenggogh_mob_main`,
      `${IMG_PATH}/daenggogh/details/mob/daenggogh_mob_pending`,
      `${IMG_PATH}/daenggogh/details/mob/daenggogh_mob_upload`,
    ],
    pcImgDescription: ["댕고흐 이미지 업로드 창", "댕고흐 이미지 필터링 결과", "댕고흐 이미지 업로드 전 최종확인 창"],
    mobImgDescription: ["댕고흐 이미지 업로드 창", "댕고흐 이미지 필터링 결과", "댕고흐 이미지 업로드 전 최종확인 창"],
    site: {
      name: "댕고흐",
      url: "https://daenggogh.com/",
    },
  },
};
