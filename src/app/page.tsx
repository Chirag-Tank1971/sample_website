import styles from "./page.module.css";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";

export default function Home() {
  return (
    <div className={styles.shell}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <header className={styles.hero}>
            <div className={styles.topMeta}>
              <div className={styles.topItem}>
                <div className={styles.topValue}>17.03.2025</div>
                <div className={styles.topLabel}>date</div>
              </div>
              <div className={styles.topItem}>
                <div className={styles.topValue}>The Barn Tea</div>
                <div className={styles.topLabel}>place</div>
              </div>
            </div>

            <div className={styles.topRule} />

            <div className={styles.heroInner}>
              <div className={styles.scriptTitle}>Thanu &amp; Jathu</div>
              <h1 className={styles.mainHeading}>
                We are inviting you
                <br />
                to our reception!
              </h1>
              <p className={styles.lead}>
                Let’s celebrate the best day of our life together!
              </p>
            </div>

            <div
              className={styles.heroImageWrap}
              aria-hidden="true"
            />
          </header>

          <section className={styles.sectionText}>
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
            <div className={styles.timelineCard}>
              <div className={styles.timelineTab}>17 March</div>
              <div className={styles.timeline}>
                <div className={styles.row}>
                  <div className={styles.what}>Wedding ceremony</div>
                  <div className={styles.when}>3:30 pm</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.what}>Cocktail hour</div>
                  <div className={styles.when}>5:00 pm</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.what}>Dinner</div>
                  <div className={styles.when}>7:00 pm</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.what}>First dance</div>
                  <div className={styles.when}>8:00 pm</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.what}>Party</div>
                  <div className={styles.when}>8:15 pm</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.what}>Closing</div>
                  <div className={styles.when}>1:45 am</div>
                </div>
              </div>

            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.scriptSectionTitle}>The event starts in:</div>
            <div className={styles.countdownCard}>
              <Countdown targetIsoLocal="2025-03-17T15:30:00" />
            </div>
            <div
              className={styles.countdownImageWrap}
              aria-hidden="true"
            />
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Dress code</h2>
            <p className={styles.p}>
              We would be very happy if your outfit reflects the style of our
              celebration!
            </p>
            <div className={styles.dressGallery}>
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
            </div>
            <div className={styles.dressGrid}>
              <div className={styles.dress}>
                <div className={styles.dressTitle}>For ladies</div>
                <div className={styles.dressText}>
                  Anarkali suit, lehenghas/sarees
                </div>
              </div>
              <div className={styles.dress}>
                <div className={styles.dressTitle}>For men</div>
                <div className={styles.dressText}>Suits, smart casual</div>
              </div>
              <div className={styles.dress}>
                <div className={styles.dressTitle}>Colours</div>
                <div className={styles.dressText}>All colours and prints are allowed</div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Please confirm your attendance</h2>
            <RsvpForm />
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Organizational aspects</h2>
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

          <section className={styles.section}>
            <h2 className={styles.h2}>A note about gifts</h2>
            <p className={styles.p}>
              Your presence at our wedding is all we truly need. If you wish to
              give a gift, a contribution toward our journey together would be
              greatly appreciated.
            </p>
            <p className={styles.p}>
              Thank you for celebrating this moment with us — it means the world!
            </p>
            <div className={styles.signoff}>Hope to see you there! — Thanu &amp; Jathu</div>
          </section>

          <section className={styles.section}>
            <div className={styles.closingImage} aria-hidden="true" />
            <div className={styles.closingTextBlock}>
              <div className={styles.scriptSectionTitle}>Hope to see you there!</div>
              <div className={styles.closingNames}>Thanu &amp; Jathu</div>
              <div className={styles.closingHeart}>♡</div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Audio</h2>
            <p className={styles.p}>
              Add an audio file at <span className={styles.code}>public/audio.mp3</span>{" "}
              to enable playback.
            </p>
            <audio className={styles.audio} controls preload="none">
              <source src="/audio.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </section>

          <footer className={styles.footer}>
            <div className={styles.footerInner}>
              <div className={styles.footerMark}>Thanu &amp; Jathu</div>
              <div className={styles.footerSub}>Join us in making this day unforgettable.</div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
