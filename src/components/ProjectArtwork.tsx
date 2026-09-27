import { useEffect, useRef } from "react";

type ArtworkKind = "education" | "campus" | "trust" | "praman" | "surveillance";

type ProjectArtworkProps = {
  kind: ArtworkKind;
  title: string;
};

const palettes: Record<ArtworkKind, { background: string; accent: string; secondary: string }> = {
  education: { background: "#10252b", accent: "#62e3c0", secondary: "#e6b96b" },
  campus: { background: "#18271e", accent: "#a9e65e", secondary: "#65c9b7" },
  trust: { background: "#252033", accent: "#e2ae70", secondary: "#8bcbd0" },
  praman: { background: "#2c2022", accent: "#f08b72", secondary: "#eacb78" },
  surveillance: { background: "#1b2527", accent: "#efbd55", secondary: "#ed776b" },
};

const ProjectArtwork = ({ kind, title }: ProjectArtworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const { background, accent, secondary } = palettes[kind];
    const roundedRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      color: string
    ) => {
      context.fillStyle = color;
      context.beginPath();
      context.roundRect(x, y, width, height, radius);
      context.fill();
    };
    const line = (x: number, y: number, width: number, color: string, height = 8) =>
      roundedRect(x, y, width, height, height / 2, color);

    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const glow = context.createRadialGradient(930, 90, 10, 930, 90, 520);
    glow.addColorStop(0, `${accent}33`);
    glow.addColorStop(1, `${background}00`);
    context.fillStyle = glow;
    context.fillRect(0, 0, canvas.width, canvas.height);

    roundedRect(42, 38, 1116, 599, 18, "#11151ddd");
    roundedRect(68, 61, 12, 12, 6, accent);
    roundedRect(91, 61, 12, 12, 6, secondary);
    roundedRect(114, 61, 12, 12, 6, "#ef7c75");
    line(158, 63, 178, "#ffffff28", 8);
    roundedRect(965, 52, 154, 32, 16, `${accent}24`);
    context.fillStyle = accent;
    context.font = "600 13px Arial, sans-serif";
    context.fillText("PROJECT VISUALIZATION", 984, 73);

    context.fillStyle = "#f4f0e8";
    context.font = "600 34px Arial, sans-serif";
    context.fillText(title, 76, 139, 790);

    if (kind === "education") {
      roundedRect(76, 169, 700, 365, 12, "#19373b");
      context.fillStyle = "#2e5650";
      context.beginPath();
      context.moveTo(76, 452);
      context.lineTo(256, 332);
      context.lineTo(394, 417);
      context.lineTo(541, 300);
      context.lineTo(776, 454);
      context.lineTo(776, 534);
      context.lineTo(76, 534);
      context.fill();
      context.fillStyle = "#e8bd72";
      context.beginPath();
      context.arc(610, 255, 38, 0, Math.PI * 2);
      context.fill();
      roundedRect(376, 307, 90, 90, 45, "#f7f2e833");
      context.fillStyle = "#f7f2e8";
      context.beginPath();
      context.moveTo(412, 329);
      context.lineTo(412, 375);
      context.lineTo(449, 352);
      context.fill();
      roundedRect(800, 169, 320, 365, 12, "#ffffff0d");
      line(828, 205, 154, accent, 12);
      line(828, 237, 235, "#ffffff47");
      line(828, 257, 196, "#ffffff25");
      [0, 1, 2].forEach((index) => {
        roundedRect(828, 300 + index * 62, 264, 46, 9, "#ffffff0d");
        roundedRect(842, 314 + index * 62, 18, 18, 9, index === 0 ? accent : "#ffffff28");
        line(875, 316 + index * 62, 150, "#ffffff70", 7);
        line(875, 329 + index * 62, 95, "#ffffff2d", 6);
      });
      line(80, 578, 1030, "#ffffff24", 7);
      roundedRect(80, 575, 418, 13, 7, accent);
      roundedRect(484, 569, 18, 25, 8, "#f4f0e8");
    } else if (kind === "campus") {
      const cards = [76, 294, 512];
      cards.forEach((x, index) => {
        roundedRect(x, 174, 194, 118, 12, "#ffffff0d");
        line(x + 20, 196, 78, "#ffffff52", 7);
        context.fillStyle = index === 1 ? secondary : accent;
        context.font = "600 31px Arial, sans-serif";
        context.fillText(["68%", "1.4", "−12%"][index], x + 20, 257);
        context.fillStyle = "#ffffff55";
        context.font = "14px Arial, sans-serif";
        context.fillText(["renewable", "MWh today", "peak demand"][index], x + 20, 278);
      });
      roundedRect(76, 318, 630, 258, 12, "#ffffff0d");
      line(100, 341, 180, "#ffffff50", 8);
      [82, 122, 93, 164, 138, 193, 160, 218, 176, 237, 195, 211].forEach((height, index) => {
        roundedRect(110 + index * 43, 543 - height, 22, height, 7, index > 8 ? accent : `${accent}85`);
      });
      [0, 1, 2].forEach((index) => {
        const x = 756 + index * 121;
        roundedRect(x, 190, 102, 360, 10, "#ffffff0d");
        roundedRect(x + 19, 262, 64, 106, 5, "#668277");
        roundedRect(x + 34, 229, 34, 33, 4, "#7f9d8c");
        [0, 1, 2].forEach((windowIndex) =>
          roundedRect(x + 27 + windowIndex * 22, 282, 11, 17, 3, secondary)
        );
        roundedRect(x + 34, 316, 11, 17, 3, secondary);
        roundedRect(x + 57, 316, 11, 17, 3, secondary);
        roundedRect(x + 43, 339, 16, 29, 3, accent);
      });
      line(756, 578, 336, "#ffffff27", 7);
    } else if (kind === "trust") {
      roundedRect(76, 174, 420, 390, 14, "#ffffff0d");
      roundedRect(115, 221, 112, 112, 56, `${secondary}36`);
      context.fillStyle = secondary;
      context.beginPath();
      context.arc(171, 259, 24, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.ellipse(171, 310, 43, 25, 0, Math.PI, 0);
      context.fill();
      line(250, 236, 188, "#ffffffab", 11);
      line(250, 259, 132, "#ffffff42", 8);
      roundedRect(250, 286, 135, 31, 16, `${accent}2c`);
      context.fillStyle = accent;
      context.font = "600 14px Arial, sans-serif";
      context.fillText("VERIFIED MATCH", 267, 307);
      [0, 1, 2].forEach((index) => {
        line(115, 374 + index * 47, 282 - index * 37, "#ffffff35", 8);
      });
      roundedRect(540, 174, 580, 390, 14, "#ffffff0d");
      context.strokeStyle = `${accent}75`;
      context.lineWidth = 4;
      context.beginPath();
      context.arc(830, 344, 115, -Math.PI / 2, Math.PI * 1.15);
      context.stroke();
      context.fillStyle = accent;
      context.font = "600 51px Arial, sans-serif";
      context.fillText("92%", 778, 354);
      context.fillStyle = "#ffffff78";
      context.font = "15px Arial, sans-serif";
      context.fillText("ROLE MATCH", 790, 382);
      [0, 1, 2, 3].forEach((index) => {
        const x = 600 + index * 148;
        roundedRect(x, 489, 27, 27, 14, index < 3 ? accent : "#ffffff35");
        if (index < 3) line(x + 43, 499, 77, "#ffffff70", 8);
      });
    } else if (kind === "praman") {
      roundedRect(76, 174, 700, 390, 12, "#f2eee5");
      roundedRect(100, 197, 104, 30, 4, "#bc4f3c");
      context.fillStyle = "#fffaf0";
      context.font = "700 14px Arial, sans-serif";
      context.fillText("FACT CHECK", 116, 217);
      context.fillStyle = "#392d2b";
      context.font = "700 29px Arial, sans-serif";
      context.fillText("What the evidence", 101, 279);
      context.fillText("really tells us", 101, 314);
      line(101, 337, 399, "#392d2b28", 7);
      line(101, 356, 348, "#392d2b1e", 7);
      line(101, 375, 371, "#392d2b1e", 7);
      roundedRect(514, 252, 215, 150, 7, "#d6b78b");
      context.fillStyle = "#8f5c47";
      context.beginPath();
      context.moveTo(514, 362);
      context.lineTo(580, 297);
      context.lineTo(621, 340);
      context.lineTo(666, 286);
      context.lineTo(729, 354);
      context.lineTo(729, 402);
      context.lineTo(514, 402);
      context.fill();
      context.strokeStyle = accent;
      context.lineWidth = 12;
      context.beginPath();
      context.arc(632, 325, 100, -0.9, 1.25);
      context.stroke();
      context.beginPath();
      context.moveTo(702, 394);
      context.lineTo(756, 449);
      context.stroke();
      roundedRect(101, 431, 174, 83, 8, "#e3ddd1");
      roundedRect(291, 431, 174, 83, 8, "#e3ddd1");
      roundedRect(481, 431, 248, 83, 8, "#e3ddd1");
      roundedRect(812, 174, 308, 390, 12, "#ffffff0d");
      line(842, 208, 142, accent, 10);
      [0, 1, 2].forEach((index) => {
        roundedRect(842, 244 + index * 83, 246, 61, 8, "#ffffff0d");
        roundedRect(857, 260 + index * 83, 16, 16, 8, [accent, secondary, "#ffffff55"][index]);
        line(888, 258 + index * 83, 157, "#ffffff67", 7);
        line(888, 274 + index * 83, 112, "#ffffff2d", 6);
      });
    } else {
      roundedRect(76, 174, 730, 390, 12, "#172023");
      context.strokeStyle = "#ffffff12";
      context.lineWidth = 1;
      for (let x = 106; x < 800; x += 44) {
        context.beginPath();
        context.moveTo(x, 190);
        context.lineTo(x, 550);
        context.stroke();
      }
      for (let y = 202; y < 560; y += 44) {
        context.beginPath();
        context.moveTo(90, y);
        context.lineTo(790, y);
        context.stroke();
      }
      roundedRect(100, 430, 680, 20, 5, "#2d3838");
      roundedRect(100, 468, 680, 20, 5, "#2d3838");
      roundedRect(310, 260, 240, 165, 3, "#344344");
      roundedRect(388, 282, 80, 32, 5, `${accent}b0`);
      roundedRect(287, 247, 284, 202, 8, "#efbd5520");
      context.strokeStyle = accent;
      context.lineWidth = 4;
      context.strokeRect(287, 247, 284, 202);
      context.beginPath();
      context.moveTo(272, 247);
      context.lineTo(272, 224);
      context.lineTo(302, 224);
      context.moveTo(556, 247);
      context.lineTo(556, 224);
      context.lineTo(586, 224);
      context.stroke();
      roundedRect(830, 174, 290, 390, 12, "#ffffff0d");
      roundedRect(860, 207, 17, 17, 9, accent);
      line(892, 211, 164, "#ffffff8c", 9);
      line(860, 252, 222, secondary, 8);
      [0, 1, 2, 3].forEach((index) => {
        line(860, 299 + index * 42, 206 - index * 22, "#ffffff30", 7);
      });
      roundedRect(860, 492, 225, 38, 19, `${accent}25`);
      context.fillStyle = accent;
      context.font = "600 15px Arial, sans-serif";
      context.fillText("PRIORITY ROUTE READY", 879, 516);
    }
  }, [kind, title]);

  return (
    <canvas
      ref={canvasRef}
      className="project-artwork"
      width={1200}
      height={675}
      role="img"
      aria-label={`Concept artwork for ${title}`}
    />
  );
};

export default ProjectArtwork;