import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import '../components/AboutImgCard.css';
import AboutImg  from '../assets/images/about.jpeg';

const DecayCard = ({
  width = 400,
  height = 500,
  borderRadius = 20,
  image = AboutImg,
  children,
}) => {
  const svgRef = useRef(null);
  const displacementMapRef = useRef(null);
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cachedCursor = useRef({ ...cursor.current });
  const winsize = useRef({ width: window.innerWidth, height: window.innerHeight });


  useEffect(() => {
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const map  = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
    const dist = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);

    const onResize = () =>
      (winsize.current = { width: window.innerWidth, height: window.innerHeight });
    const onMove = (e) => (cursor.current = { x: e.clientX, y: e.clientY });

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const vals = { img: { x: 0, y: 0, rz: 0 }, disp: 0 };

    const render = () => {
      /* parallax targets */
      let tx = lerp(vals.img.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);
      let ty = lerp(vals.img.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);
      let rz = lerp(vals.img.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);

      const bound = 50;
      if (tx >  bound) tx =  bound + (tx -  bound) * 0.2;
      if (tx < -bound) tx = -bound + (tx +  bound) * 0.2;
      if (ty >  bound) ty =  bound + (ty -  bound) * 0.2;
      if (ty < -bound) ty = -bound + (ty +  bound) * 0.2;

      vals.img = { x: tx, y: ty, rz };

      gsap.set(svgRef.current, { x: tx, y: ty, rotateZ: rz });

      /* displacement amount */
      const traveled = dist(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      vals.disp = lerp(vals.disp, map(traveled, 0, 200, 0, 400), 0.06);
      gsap.set(displacementMapRef.current, { attr: { scale: vals.disp } });

      cachedCursor.current = { ...cursor.current };
      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);


  const vbW = 600;
  const vbH = 750;

  return (
    <div
      ref={svgRef}
      className="content"
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"   
        className="svg"
      >
        {/* ─────── FX filter ─────── */}
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            result="turb"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turb"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>

        {/* ─────── Image ─────── */}
        <image
          href={image}
          x="0"
          y="0"
          width={vbW}
          height={vbH}
          filter="url(#imgFilter)"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>

      {/* overlay text / children */}
      <div className="card-text">{children}</div>
    </div>
  );
};

export default DecayCard;

