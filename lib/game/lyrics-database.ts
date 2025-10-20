import { Lyric, DifficultyConfig } from "@/types/game";

// Korean rap lyrics database with 100+ entries
const LYRICS_DATABASE: Lyric[] = [
  // Ultra Easy lyrics (2-4 syllables) - For absolute beginners
  { text: "안녕", bpm: 80, syllables: 2, artist: "Various" },
  { text: "화이팅", bpm: 80, syllables: 3, artist: "Various" },
  { text: "힘내", bpm: 80, syllables: 2, artist: "Various" },
  { text: "꿈꿔", bpm: 80, syllables: 2, artist: "Various" },
  { text: "할 수 있어", bpm: 80, syllables: 4, artist: "Various" },
  { text: "오늘", bpm: 80, syllables: 2, artist: "Various" },
  { text: "내일", bpm: 80, syllables: 2, artist: "Various" },
  { text: "좋은 날", bpm: 80, syllables: 3, artist: "Various" },
  { text: "포기 마", bpm: 80, syllables: 3, artist: "Various" },
  { text: "열심히", bpm: 80, syllables: 3, artist: "Various" },
  { text: "최선", bpm: 80, syllables: 2, artist: "Various" },
  { text: "꿈", bpm: 80, syllables: 1, artist: "Various" },
  { text: "주인공", bpm: 80, syllables: 3, artist: "Various" },
  { text: "시간", bpm: 80, syllables: 2, artist: "Various" },
  { text: "시작", bpm: 80, syllables: 2, artist: "Various" },
  { text: "두려움", bpm: 80, syllables: 3, artist: "Various" },
  { text: "마음", bpm: 80, syllables: 2, artist: "Various" },
  { text: "살아", bpm: 80, syllables: 2, artist: "Various" },
  { text: "성공", bpm: 80, syllables: 2, artist: "Various" },
  { text: "미래", bpm: 80, syllables: 2, artist: "Various" },
  { text: "기회", bpm: 80, syllables: 2, artist: "Various" },
  { text: "선택", bpm: 80, syllables: 2, artist: "Various" },
  { text: "노력", bpm: 80, syllables: 2, artist: "Various" },
  { text: "승리", bpm: 80, syllables: 2, artist: "Various" },
  { text: "희망", bpm: 80, syllables: 2, artist: "Various" },
  { text: "도전", bpm: 80, syllables: 2, artist: "Various" },
  { text: "성장", bpm: 80, syllables: 2, artist: "Various" },
  { text: "변화", bpm: 80, syllables: 2, artist: "Various" },
  { text: "발전", bpm: 80, syllables: 2, artist: "Various" },
  { text: "진보", bpm: 80, syllables: 2, artist: "Various" },

  // Very Easy lyrics (4-7 syllables) - For beginners
  { text: "안녕하세요", bpm: 80, syllables: 5, artist: "Various" },
  { text: "오늘도 화이팅", bpm: 80, syllables: 6, artist: "Various" },
  { text: "힘내자", bpm: 80, syllables: 3, artist: "Various" },
  { text: "꿈을 꿔", bpm: 80, syllables: 3, artist: "Various" },
  { text: "할 수 있어", bpm: 80, syllables: 4, artist: "Various" },
  { text: "오늘 하루", bpm: 80, syllables: 4, artist: "Various" },
  { text: "내일도 좋은 날", bpm: 80, syllables: 6, artist: "Various" },
  { text: "포기하지 마", bpm: 80, syllables: 5, artist: "Various" },
  { text: "열심히 해", bpm: 80, syllables: 4, artist: "Various" },
  { text: "최선을 다해", bpm: 80, syllables: 5, artist: "Various" },
  { text: "꿈을 향해", bpm: 80, syllables: 4, artist: "Various" },
  { text: "내가 주인공", bpm: 80, syllables: 5, artist: "Various" },
  { text: "시간은 금", bpm: 80, syllables: 4, artist: "Various" },
  { text: "새로운 시작", bpm: 80, syllables: 5, artist: "Various" },
  { text: "두려움 없이", bpm: 80, syllables: 5, artist: "Various" },
  { text: "마음대로 살아", bpm: 80, syllables: 6, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 80, syllables: 9, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 80, syllables: 11, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 80, syllables: 12, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 80, syllables: 9, artist: "Various" },

  // Easy lyrics (8-12 syllables)
  { text: "오늘 내가 할 일을 해", bpm: 100, syllables: 10, artist: "Various" },
  { text: "내일은 늦을지 모르니까", bpm: 120, syllables: 12, artist: "Various" },
  { text: "꿈을 향해 달려가자", bpm: 90, syllables: 8, artist: "Various" },
  { text: "힘들어도 포기하지 마", bpm: 110, syllables: 9, artist: "Various" },
  { text: "오늘도 열심히 살아가", bpm: 95, syllables: 10, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 105, syllables: 11, artist: "Various" },
  { text: "시간은 금이니까", bpm: 85, syllables: 8, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 115, syllables: 12, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 100, syllables: 9, artist: "Various" },
  { text: "오늘의 나는 어제보다 강하다", bpm: 120, syllables: 12, artist: "Various" },
  { text: "꿈을 쫓아서 달려가", bpm: 90, syllables: 8, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 110, syllables: 12, artist: "Various" },
  { text: "오늘 하루도 최선을 다해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "내 인생은 내가 주인공", bpm: 100, syllables: 9, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 115, syllables: 10, artist: "Various" },
  { text: "오늘도 새로운 시작", bpm: 85, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 90, syllables: 9, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 120, syllables: 12, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 11, artist: "Various" },

  // Medium lyrics (13-25 syllables)
  {
    text: "오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자",
    bpm: 130,
    syllables: 18,
    artist: "Various",
  },
  {
    text: "힘들어도 포기하지 마 오늘도 열심히 살아가 내 손으로 만드는 미래",
    bpm: 140,
    syllables: 20,
    artist: "Various",
  },
  {
    text: "시간은 금이니까 노력하는 자에게 기회는 온다 포기는 선택이 아니다",
    bpm: 135,
    syllables: 19,
    artist: "Various",
  },
  {
    text: "오늘의 나는 어제보다 강하다 꿈을 쫓아서 달려가 실패는 성공의 어머니",
    bpm: 145,
    syllables: 21,
    artist: "Various",
  },
  {
    text: "내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해 내 인생은 내가 주인공",
    bpm: 150,
    syllables: 24,
    artist: "Various",
  },
  {
    text: "두려움은 이겨낼 수 있어 오늘도 새로운 시작 내 마음대로 살아가자",
    bpm: 125,
    syllables: 17,
    artist: "Various",
  },
  { text: "시간은 흘러가지만 꿈은 남아있어 포기하지 않는 자가 승리한다", bpm: 140, syllables: 18, artist: "Various" },
  {
    text: "오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자 힘들어도 포기하지 마",
    bpm: 160,
    syllables: 22,
    artist: "Various",
  },
  { text: "오늘도 열심히 살아가 내 손으로 만드는 미래 시간은 금이니까", bpm: 130, syllables: 16, artist: "Various" },
  {
    text: "노력하는 자에게 기회는 온다 포기는 선택이 아니다 오늘의 나는 어제보다 강하다",
    bpm: 155,
    syllables: 20,
    artist: "Various",
  },
  {
    text: "꿈을 쫓아서 달려가 실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야",
    bpm: 145,
    syllables: 19,
    artist: "Various",
  },
  {
    text: "오늘 하루도 최선을 다해 내 인생은 내가 주인공 두려움은 이겨낼 수 있어",
    bpm: 150,
    syllables: 21,
    artist: "Various",
  },
  {
    text: "오늘도 새로운 시작 내 마음대로 살아가자 시간은 흘러가지만 꿈은 남아있어",
    bpm: 135,
    syllables: 18,
    artist: "Various",
  },
  {
    text: "포기하지 않는 자가 승리한다 오늘 내가 할 일을 해 내일은 늦을지 모르니까",
    bpm: 160,
    syllables: 20,
    artist: "Various",
  },
  { text: "꿈을 향해 달려가자 힘들어도 포기하지 마 오늘도 열심히 살아가", bpm: 140, syllables: 17, artist: "Various" },
  {
    text: "내 손으로 만드는 미래 시간은 금이니까 노력하는 자에게 기회는 온다",
    bpm: 155,
    syllables: 19,
    artist: "Various",
  },
  {
    text: "포기는 선택이 아니다 오늘의 나는 어제보다 강하다 꿈을 쫓아서 달려가",
    bpm: 145,
    syllables: 18,
    artist: "Various",
  },
  {
    text: "실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해",
    bpm: 150,
    syllables: 21,
    artist: "Various",
  },
  {
    text: "내 인생은 내가 주인공 두려움은 이겨낼 수 있어 오늘도 새로운 시작",
    bpm: 130,
    syllables: 16,
    artist: "Various",
  },
  {
    text: "내 마음대로 살아가자 시간은 흘러가지만 꿈은 남아있어 포기하지 않는 자가 승리한다",
    bpm: 160,
    syllables: 22,
    artist: "Various",
  },

  // Hard lyrics (26-50 syllables)
  {
    text: "오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자 힘들어도 포기하지 마 오늘도 열심히 살아가",
    bpm: 170,
    syllables: 28,
    artist: "Various",
  },
  {
    text: "내 손으로 만드는 미래 시간은 금이니까 노력하는 자에게 기회는 온다 포기는 선택이 아니다 오늘의 나는 어제보다 강하다",
    bpm: 180,
    syllables: 32,
    artist: "Various",
  },
  {
    text: "꿈을 쫓아서 달려가 실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해 내 인생은 내가 주인공",
    bpm: 190,
    syllables: 35,
    artist: "Various",
  },
  {
    text: "두려움은 이겨낼 수 있어 오늘도 새로운 시작 내 마음대로 살아가자 시간은 흘러가지만 꿈은 남아있어 포기하지 않는 자가 승리한다",
    bpm: 200,
    syllables: 38,
    artist: "Various",
  },
  {
    text: "오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자 힘들어도 포기하지 마 오늘도 열심히 살아가 내 손으로 만드는 미래",
    bpm: 185,
    syllables: 30,
    artist: "Various",
  },
  {
    text: "시간은 금이니까 노력하는 자에게 기회는 온다 포기는 선택이 아니다 오늘의 나는 어제보다 강하다 꿈을 쫓아서 달려가 실패는 성공의 어머니",
    bpm: 195,
    syllables: 33,
    artist: "Various",
  },
  {
    text: "내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해 내 인생은 내가 주인공 두려움은 이겨낼 수 있어 오늘도 새로운 시작",
    bpm: 200,
    syllables: 36,
    artist: "Various",
  },
  {
    text: "내 마음대로 살아가자 시간은 흘러가지만 꿈은 남아있어 포기하지 않는 자가 승리한다 오늘 내가 할 일을 해 내일은 늦을지 모르니까",
    bpm: 190,
    syllables: 34,
    artist: "Various",
  },
  {
    text: "꿈을 향해 달려가자 힘들어도 포기하지 마 오늘도 열심히 살아가 내 손으로 만드는 미래 시간은 금이니까 노력하는 자에게 기회는 온다",
    bpm: 185,
    syllables: 31,
    artist: "Various",
  },
  {
    text: "포기는 선택이 아니다 오늘의 나는 어제보다 강하다 꿈을 쫓아서 달려가 실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야",
    bpm: 200,
    syllables: 37,
    artist: "Various",
  },
  {
    text: "오늘 하루도 최선을 다해 내 인생은 내가 주인공 두려움은 이겨낼 수 있어 오늘도 새로운 시작 내 마음대로 살아가자",
    bpm: 195,
    syllables: 35,
    artist: "Various",
  },
  {
    text: "시간은 흘러가지만 꿈은 남아있어 포기하지 않는 자가 승리한다 오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자",
    bpm: 200,
    syllables: 38,
    artist: "Various",
  },
  {
    text: "힘들어도 포기하지 마 오늘도 열심히 살아가 내 손으로 만드는 미래 시간은 금이니까 노력하는 자에게 기회는 온다 포기는 선택이 아니다",
    bpm: 190,
    syllables: 36,
    artist: "Various",
  },
  {
    text: "오늘의 나는 어제보다 강하다 꿈을 쫓아서 달려가 실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해",
    bpm: 200,
    syllables: 39,
    artist: "Various",
  },
  {
    text: "내 인생은 내가 주인공 두려움은 이겨낼 수 있어 오늘도 새로운 시작 내 마음대로 살아가자 시간은 흘러가지만 꿈은 남아있어",
    bpm: 195,
    syllables: 37,
    artist: "Various",
  },
  {
    text: "포기하지 않는 자가 승리한다 오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자 힘들어도 포기하지 마 오늘도 열심히 살아가",
    bpm: 200,
    syllables: 40,
    artist: "Various",
  },
  {
    text: "내 손으로 만드는 미래 시간은 금이니까 노력하는 자에게 기회는 온다 포기는 선택이 아니다 오늘의 나는 어제보다 강하다 꿈을 쫓아서 달려가",
    bpm: 200,
    syllables: 42,
    artist: "Various",
  },
  {
    text: "실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해 내 인생은 내가 주인공 두려움은 이겨낼 수 있어 오늘도 새로운 시작",
    bpm: 200,
    syllables: 44,
    artist: "Various",
  },
  {
    text: "내 마음대로 살아가자 시간은 흘러가지만 꿈은 남아있어 포기하지 않는 자가 승리한다 오늘 내가 할 일을 해 내일은 늦을지 모르니까 꿈을 향해 달려가자",
    bpm: 200,
    syllables: 46,
    artist: "Various",
  },
  {
    text: "힘들어도 포기하지 마 오늘도 열심히 살아가 내 손으로 만드는 미래 시간은 금이니까 노력하는 자에게 기회는 온다 포기는 선택이 아니다 오늘의 나는 어제보다 강하다",
    bpm: 200,
    syllables: 48,
    artist: "Various",
  },
  {
    text: "꿈을 쫓아서 달려가 실패는 성공의 어머니 내가 원하는 건 다 이뤄낼 거야 오늘 하루도 최선을 다해 내 인생은 내가 주인공 두려움은 이겨낼 수 있어 오늘도 새로운 시작 내 마음대로 살아가자",
    bpm: 200,
    syllables: 50,
    artist: "Various",
  },

  // Additional Korean rap lyrics with various artists
  { text: "나는 나다 나만의 색깔로", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 내일도 계속해서", bpm: 100, syllables: 10, artist: "Various" },
  { text: "꿈을 향해 달려가는 나", bpm: 105, syllables: 9, artist: "Various" },
  { text: "포기하지 않는 마음으로", bpm: 90, syllables: 8, artist: "Various" },
  { text: "내 인생의 주인공은 나야", bpm: 110, syllables: 10, artist: "Various" },
  { text: "오늘 하루도 최선을 다해 살아가", bpm: 115, syllables: 11, artist: "Various" },
  { text: "내 손으로 만드는 내 미래", bpm: 100, syllables: 9, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 120, syllables: 12, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 새로운 시작이야", bpm: 85, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 90, syllables: 8, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 10, artist: "Various" },
  { text: "실패는 성공의 어머니야", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 120, syllables: 12, artist: "Various" },
  { text: "오늘의 나는 어제보다 강해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "꿈을 쫓아서 달려가자", bpm: 90, syllables: 8, artist: "Various" },
  { text: "힘들어도 포기하지 마", bpm: 85, syllables: 8, artist: "Various" },
  { text: "오늘도 열심히 살아가", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 100, syllables: 9, artist: "Various" },
  { text: "시간은 금이니까", bpm: 80, syllables: 8, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘의 나는 어제보다 강하다", bpm: 120, syllables: 11, artist: "Various" },
  { text: "꿈을 쫓아서 달려가", bpm: 85, syllables: 8, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 110, syllables: 11, artist: "Various" },
  { text: "오늘 하루도 최선을 다해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "내 인생은 내가 주인공", bpm: 100, syllables: 9, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 새로운 시작", bpm: 80, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 10, artist: "Various" },
  { text: "오늘 내가 할 일을 해", bpm: 90, syllables: 8, artist: "Various" },
  { text: "내일은 늦을지 모르니까", bpm: 100, syllables: 10, artist: "Various" },
  { text: "꿈을 향해 달려가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "힘들어도 포기하지 마", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘도 열심히 살아가", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 100, syllables: 9, artist: "Various" },
  { text: "시간은 금이니까", bpm: 80, syllables: 8, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘의 나는 어제보다 강하다", bpm: 120, syllables: 11, artist: "Various" },
  { text: "꿈을 쫓아서 달려가", bpm: 85, syllables: 8, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 110, syllables: 11, artist: "Various" },
  { text: "오늘 하루도 최선을 다해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "내 인생은 내가 주인공", bpm: 100, syllables: 9, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 새로운 시작", bpm: 80, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 10, artist: "Various" },
  { text: "오늘 내가 할 일을 해", bpm: 90, syllables: 8, artist: "Various" },
  { text: "내일은 늦을지 모르니까", bpm: 100, syllables: 10, artist: "Various" },
  { text: "꿈을 향해 달려가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "힘들어도 포기하지 마", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘도 열심히 살아가", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 100, syllables: 9, artist: "Various" },
  { text: "시간은 금이니까", bpm: 80, syllables: 8, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘의 나는 어제보다 강하다", bpm: 120, syllables: 11, artist: "Various" },
  { text: "꿈을 쫓아서 달려가", bpm: 85, syllables: 8, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 110, syllables: 11, artist: "Various" },
  { text: "오늘 하루도 최선을 다해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "내 인생은 내가 주인공", bpm: 100, syllables: 9, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 새로운 시작", bpm: 80, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 10, artist: "Various" },
  { text: "오늘 내가 할 일을 해", bpm: 90, syllables: 8, artist: "Various" },
  { text: "내일은 늦을지 모르니까", bpm: 100, syllables: 10, artist: "Various" },
  { text: "꿈을 향해 달려가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "힘들어도 포기하지 마", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘도 열심히 살아가", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 100, syllables: 9, artist: "Various" },
  { text: "시간은 금이니까", bpm: 80, syllables: 8, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘의 나는 어제보다 강하다", bpm: 120, syllables: 11, artist: "Various" },
  { text: "꿈을 쫓아서 달려가", bpm: 85, syllables: 8, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 110, syllables: 11, artist: "Various" },
  { text: "오늘 하루도 최선을 다해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "내 인생은 내가 주인공", bpm: 100, syllables: 9, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 새로운 시작", bpm: 80, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 10, artist: "Various" },
  { text: "오늘 내가 할 일을 해", bpm: 90, syllables: 8, artist: "Various" },
  { text: "내일은 늦을지 모르니까", bpm: 100, syllables: 10, artist: "Various" },
  { text: "꿈을 향해 달려가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "힘들어도 포기하지 마", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘도 열심히 살아가", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내 손으로 만드는 미래", bpm: 100, syllables: 9, artist: "Various" },
  { text: "시간은 금이니까", bpm: 80, syllables: 8, artist: "Various" },
  { text: "노력하는 자에게 기회는 온다", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기는 선택이 아니다", bpm: 90, syllables: 8, artist: "Various" },
  { text: "오늘의 나는 어제보다 강하다", bpm: 120, syllables: 11, artist: "Various" },
  { text: "꿈을 쫓아서 달려가", bpm: 85, syllables: 8, artist: "Various" },
  { text: "실패는 성공의 어머니", bpm: 95, syllables: 9, artist: "Various" },
  { text: "내가 원하는 건 다 이뤄낼 거야", bpm: 110, syllables: 11, artist: "Various" },
  { text: "오늘 하루도 최선을 다해", bpm: 105, syllables: 10, artist: "Various" },
  { text: "내 인생은 내가 주인공", bpm: 100, syllables: 9, artist: "Various" },
  { text: "두려움은 이겨낼 수 있어", bpm: 95, syllables: 9, artist: "Various" },
  { text: "오늘도 새로운 시작", bpm: 80, syllables: 8, artist: "Various" },
  { text: "내 마음대로 살아가자", bpm: 85, syllables: 8, artist: "Various" },
  { text: "시간은 흘러가지만 꿈은 남아있어", bpm: 115, syllables: 11, artist: "Various" },
  { text: "포기하지 않는 자가 승리한다", bpm: 110, syllables: 10, artist: "Various" },
];

export function getLyrics(): Lyric[] {
  return LYRICS_DATABASE;
}

export function getRandomLyric(difficulty: DifficultyConfig): Lyric {
  // Filter lyrics that match the difficulty requirements
  let matchingLyrics = LYRICS_DATABASE.filter(
    (lyric) =>
      lyric.syllables >= difficulty.syllablesMin &&
      lyric.syllables <= difficulty.syllablesMax &&
      Math.abs(lyric.bpm - difficulty.bpm) <= 20 // Allow some BPM flexibility
  );

  // If no exact matches, get the closest ones
  if (matchingLyrics.length === 0) {
    matchingLyrics = LYRICS_DATABASE.filter(
      (lyric) => lyric.syllables >= difficulty.syllablesMin - 2 && lyric.syllables <= difficulty.syllablesMax + 2
    );
  }

  // If still no matches, get the easiest available lyrics (2-4 syllables)
  if (matchingLyrics.length === 0) {
    matchingLyrics = LYRICS_DATABASE.filter((lyric) => lyric.syllables <= 4);
  }

  // If still no lyrics, return the first one
  if (matchingLyrics.length === 0) {
    return LYRICS_DATABASE[0];
  }

  // Return random lyric from matching ones
  const randomIndex = Math.floor(Math.random() * matchingLyrics.length);
  return matchingLyrics[randomIndex];
}

export function getLyricsByDifficulty(level: "easy" | "medium" | "hard"): Lyric[] {
  switch (level) {
    case "easy":
      return LYRICS_DATABASE.filter((lyric) => lyric.syllables >= 8 && lyric.syllables <= 12);
    case "medium":
      return LYRICS_DATABASE.filter((lyric) => lyric.syllables >= 13 && lyric.syllables <= 25);
    case "hard":
      return LYRICS_DATABASE.filter((lyric) => lyric.syllables >= 26 && lyric.syllables <= 50);
    default:
      return LYRICS_DATABASE;
  }
}

export function getLyricsByBPM(minBpm: number, maxBpm: number): Lyric[] {
  return LYRICS_DATABASE.filter((lyric) => lyric.bpm >= minBpm && lyric.bpm <= maxBpm);
}
