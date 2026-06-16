import React, { Suspense, lazy } from "react";

const MagicRings = lazy(() => import("./MagicRings.jsx"));

class IntroGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("Opening intro failed.", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function OpeningIntro({ exiting = false }) {
  return (
    <div className={`opening-intro${exiting ? " is-exiting" : ""}`} aria-hidden="true">
      <div className="opening-rings">
        <IntroGuard>
          <Suspense fallback={null}>
            <MagicRings
              color="#ffffff"
              colorTwo="#10b981"
              ringCount={6}
              speed={1}
              attenuation={10}
              lineThickness={2}
              baseRadius={0.35}
              radiusStep={0.1}
              scaleRate={0.1}
              opacity={1}
              blur={0}
              noiseAmount={0.1}
              rotation={0}
              ringGap={1.5}
              fadeIn={0.7}
              fadeOut={0.5}
              followMouse={false}
              mouseInfluence={0.2}
              hoverScale={1.2}
              parallax={0.05}
              clickBurst={false}
            />
          </Suspense>
        </IntroGuard>
      </div>
      <div className="opening-copy">
        <span>Initializing digital space</span>
        <strong>Yankai Zhao</strong>
        <p>AI-powered digital builder</p>
      </div>
    </div>
  );
}
