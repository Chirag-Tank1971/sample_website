import styles from "./page.module.css";
import { Countdown } from "@/components/Countdown";
import { FloatingAudioButton } from "../components/FloatingAudioButton";
import { HeroSection } from "../components/HeroSection";
import { IntroWrapper } from "@/components/IntroWrapper";
import { RsvpForm } from "@/components/RsvpForm";
import { RevealSection } from "@/components/RevealSection";
import { TimelineSection } from "../components/TimelineSection";

export default function Home() {
  return (
    <IntroWrapper introImage="/intro.png">
      <FloatingAudioButton />
      <div className={styles.shell}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <HeroSection dateText="17.03.2025" placeText="The Barn Tea" scrollTargetId="introText" />

          <section className={styles.sectionText} id="introText">
            <div className={styles.scriptKicker}>Dear friends and family!</div>
            <p className={styles.pCenter}>
              We are thrilled to announce a special event happening this spring —
              our wedding reception! This day wouldn’t be complete without our
              closest loved ones, so we warmly invite you to join us and celebrate
              this joyful occasion together.
            </p>
            <p className={styles.pCenter}>
              We can’t wait to share this memorable moment with you!
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.scriptSectionTitle}>Event timeline</div>
            <TimelineSection />
          </section>

          <section className={styles.countdownSection}>
            <div className={styles.countdownImageWrap}>
              <div className={styles.countdownOverlay} aria-hidden="true" />
              <div className={styles.countdownContent}>
                <Countdown targetIsoLocal="2027-03-17T15:30:00" variant="overlay" />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Dress code</div>
            <p className={styles.p}>
              We would be very happy if your outfit reflects the style of our
              celebration!
            </p>
            <RevealSection
              className={`${styles.dressGallery} ${styles.revealDress}`}
              revealedClassName={styles.revealed}
            >
              <div className={styles.dressHeroPhoto} aria-hidden="true" />
              <div className={styles.dressRow}>
                <div className={styles.dressPhotoLeft} aria-hidden="true" />
                <div className={styles.dressNoteBlock}>
                  <div className={styles.dressNoteTitle}>Anarkali suit, lehenghas/sarees</div>
                  <div className={styles.dressNoteText}>for ladies</div>
                </div>
              </div>
              <div className={styles.dressRow}>
                <div className={styles.dressNoteBlock}>
                  <div className={styles.dressNoteTitle}>Suits, smart casual</div>
                  <div className={styles.dressNoteText}>for men</div>
                </div>
                <div className={styles.dressPhotoRight} aria-hidden="true" />
              </div>
              <div className={styles.dressRow}>
                <div className={styles.dressPhotoWide} aria-hidden="true" />
                <div className={styles.dressNoteBlock}>
                  <div className={styles.dressNoteTitle}>All colours and prints</div>
                  <div className={styles.dressNoteText}>are allowed</div>
                </div>
              </div>
            </RevealSection>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Please confirm your attendance</div>
            <RsvpForm />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Organizational aspects</div>
            <p className={styles.p}>
              If you have any questions, you can always contact Thanu and Jathu.
            </p>
            <div className={styles.contacts}>
              <a className={styles.contact} href="tel:+4476629938811">
                +44 7662 9938811
              </a>
              <a className={styles.contact} href="tel:+316584621133">
                +31 6584 621133
              </a>
            </div>
          </section>

          <section className={`${styles.section} ${styles.giftsSection}`}>
            <div className={styles.sectionTitle}>A note about gifts</div>
            <p className={styles.p}>
              Your presence at our wedding is all we truly need. If you wish to
              give a gift, a contribution toward our journey together would be
              greatly appreciated.
            </p>
            <p className={styles.p}>
              Thank you for celebrating this moment with us — it means the world!
            </p>
            <div className={styles.signoff}>Hope to see you there! — Thanu &amp; Jathu</div>
            <div className={styles.closingImage} aria-hidden="true" />
            <div className={styles.closingTextBlock}>
              <div className={styles.scriptSectionTitle}>Hope to see you there!</div>
              <div className={styles.closingNames}>Thanu &amp; Jathu</div>
              <div className={styles.closingHeart}>♡</div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </IntroWrapper>
  );
}
