"use client";

import { useMemo, useState } from "react";

import styles from "../page.module.css";
import { careerTracks, quizQuestions, type CareerTrack } from "./quiz-data";

type Answers = Record<string, number>;

function buildResults(answers: Answers) {
  const maxDisplayPercent = 85;
  const scores = Object.fromEntries(careerTracks.map((track) => [track.key, 0])) as Record<
    CareerTrack["key"],
    number
  >;

  for (const question of quizQuestions) {
    const selectedIndex = answers[question.id];
    if (selectedIndex === undefined) continue;

    const option = question.options[selectedIndex];
    if (!option) continue;

    for (const [trackKey, weight] of Object.entries(option.impacts)) {
      scores[trackKey as CareerTrack["key"]] += weight ?? 0;
    }
  }

  const maxScore = Math.max(...Object.values(scores), 1);

  return careerTracks
    .map((track) => ({
      ...track,
      score: scores[track.key],
      percent: Math.round((scores[track.key] / maxScore) * maxDisplayPercent),
    }))
    .sort((a, b) => b.score - a.score);
}

export default function QuizClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];
  const selectedIndex = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / quizQuestions.length) * 100);

  const results = useMemo(() => buildResults(answers), [answers]);
  const topResults = results.slice(0, 3);
  const topScoreGap =
    topResults.length >= 2 ? topResults[0].score - topResults[1].score : (topResults[0]?.score ?? 0);

  function handleSelect(optionIndex: number) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionIndex,
    }));
  }

  function handleNext() {
    if (currentIndex === quizQuestions.length - 1) {
      setIsSubmitted(true);
      return;
    }

    setCurrentIndex((previous) => Math.min(previous + 1, quizQuestions.length - 1));
  }

  function handlePrevious() {
    setCurrentIndex((previous) => Math.max(previous - 1, 0));
  }

  function handleRestart() {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  }

  function handleReview() {
    setIsSubmitted(false);
    setCurrentIndex(0);
  }

  if (isSubmitted) {
    return (
      <section className={styles.quizShell}>
        <div className={styles.quizResultHero}>
          <div>
            <p className={styles.quizKicker}>Kết quả bài test</p>
            <h2 className={styles.quizResultTitle}>Nhóm ngành phù hợp nhất với anh/chị lúc này</h2>
            <p className={styles.quizResultLead}>
              Kết quả này nên được xem như định hướng ban đầu để chọn ngành học và danh sách trường,
              không phải nhãn cố định cho cả tương lai.
            </p>
          </div>
          <div className={styles.quizResultActions}>
            <button type="button" className={styles.quizGhostButton} onClick={handleReview}>
              Xem lại câu trả lời
            </button>
            <button type="button" className={styles.quizPrimaryButton} onClick={handleRestart}>
              Làm lại từ đầu
            </button>
          </div>
        </div>

        <div className={styles.quizResultGrid}>
          {topResults.map((result, index) => (
            <article key={result.key} className={styles.quizResultCard}>
              <div className={styles.quizResultCardTop}>
                <span className={styles.quizRankBadge}>Top {index + 1}</span>
                <span
                  className={styles.quizTrackDot}
                  style={{ backgroundColor: result.color }}
                  aria-hidden="true"
                />
              </div>
              <h3 className={styles.quizTrackTitle}>{result.title}</h3>
              <p className={styles.quizTrackSummary}>{result.summary}</p>

              <div className={styles.quizScoreBar} aria-hidden="true">
                <span style={{ width: `${result.percent}%`, backgroundColor: result.color }} />
              </div>
              <p className={styles.quizScoreText}>Mức độ phù hợp tương đối: {result.percent}%</p>

              <div className={styles.quizMetaBlock}>
                <p className={styles.quizMetaLabel}>Ngành có thể cân nhắc</p>
                <p className={styles.quizMetaText}>{result.majors.join(" • ")}</p>
              </div>

              <div className={styles.quizMetaBlock}>
                <p className={styles.quizMetaLabel}>Điểm mạnh nổi bật</p>
                <p className={styles.quizMetaText}>{result.strengths.join(" • ")}</p>
              </div>

              <div className={styles.quizMetaBlock}>
                <p className={styles.quizMetaLabel}>Kiểu môi trường hợp hơn</p>
                <p className={styles.quizMetaText}>{result.workStyle.join(" • ")}</p>
              </div>

              <p className={styles.quizTrackCaution}>{result.caution}</p>
            </article>
          ))}
        </div>

        <div className={styles.quizInsightPanel}>
          <div className={styles.quizInsightCard}>
            <p className={styles.quizMetaLabel}>Cách đọc kết quả</p>
            <p className={styles.quizMetaText}>
              {topScoreGap <= 1
                ? "Điểm của các nhóm ngành đang khá sát nhau. Điều đó thường nghĩa là anh/chị có hồ sơ thiên hướng đa dạng, nên xem thêm môi trường học, chương trình đào tạo và kiểu công việc thực tế."
                : `Nhóm "${topResults[0]?.shortTitle}" đang nhỉnh hơn tương đối rõ. Đây là tín hiệu tốt để ưu tiên tìm hiểu sâu các ngành và các trường mạnh trong nhóm này trước.`}
            </p>
          </div>
          <div className={styles.quizInsightCard}>
            <p className={styles.quizMetaLabel}>Bước tiếp theo nên làm</p>
            <p className={styles.quizMetaText}>
              Lấy 2-3 nhóm ngành top đầu, đối chiếu tiếp với năng lực học tập hiện tại, mức độ thích
              môn học, điều kiện tài chính và danh sách trường anh/chị đang quan tâm.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.quizShell}>
      <div className={styles.quizProgressCard}>
        <div className={styles.quizProgressTop}>
          <div>
            <p className={styles.quizKicker}>Bài test hướng nghiệp</p>
            <h2 className={styles.quizStepTitle}>
              Câu {currentIndex + 1}/{quizQuestions.length}
            </h2>
          </div>
          <p className={styles.quizProgressText}>
            {answeredCount}/{quizQuestions.length} câu đã chọn
          </p>
        </div>

        <div className={styles.quizProgressBar} aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <article className={styles.quizQuestionCard}>
        <div className={styles.quizQuestionHeader}>
          <h3 className={styles.quizQuestionTitle}>{currentQuestion.prompt}</h3>
          <p className={styles.quizQuestionHelper}>{currentQuestion.helper}</p>
        </div>

        <div className={styles.quizOptionGrid}>
          {currentQuestion.options.map((option, optionIndex) => {
            const isActive = selectedIndex === optionIndex;

            return (
              <button
                key={option.label}
                type="button"
                className={`${styles.quizOptionCard} ${isActive ? styles.quizOptionCardActive : ""}`.trim()}
                onClick={() => handleSelect(optionIndex)}
              >
                <span className={styles.quizOptionMarker}>{String.fromCharCode(65 + optionIndex)}</span>
                <span className={styles.quizOptionContent}>
                  <span className={styles.quizOptionLabel}>{option.label}</span>
                  <span className={styles.quizOptionDescription}>{option.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.quizQuestionActions}>
          <button
            type="button"
            className={styles.quizGhostButton}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Câu trước
          </button>
          <button
            type="button"
            className={styles.quizPrimaryButton}
            onClick={handleNext}
            disabled={selectedIndex === undefined}
          >
            {currentIndex === quizQuestions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        </div>
      </article>

      <div className={styles.quizPreviewPanel}>
        <div className={styles.quizPreviewCard}>
          <p className={styles.quizMetaLabel}>Nhóm nghề đang xuất hiện trong bài test</p>
          <div className={styles.quizTrackList}>
            {careerTracks.map((track) => (
              <span key={track.key} className={styles.quizTrackChip}>
                <span
                  className={styles.quizTrackDot}
                  style={{ backgroundColor: track.color }}
                  aria-hidden="true"
                />
                {track.shortTitle}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.quizPreviewCard}>
          <p className={styles.quizMetaLabel}>Lưu ý nhỏ</p>
          <p className={styles.quizMetaText}>
            Bài test này thiên về độ phù hợp giữa kiểu tư duy, môi trường làm việc và động lực nghề
            nghiệp. Bộ câu hỏi đã tính cả những hướng mới như AI, dữ liệu, marketing số và luật
            kinh doanh, nên kết quả sẽ tốt hơn nếu anh/chị trả lời theo cảm giác thật thay vì chọn
            đáp án “có vẻ đúng”.
          </p>
        </div>
      </div>
    </section>
  );
}
