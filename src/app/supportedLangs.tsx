export const supportedLangs = [
  { id: 50, language: "c", engine: "C (GCC 9.2.0)" },
  { id: 75, language: "c", engine: "C (Clang 7.0.1)" },
  { id: 54, language: "cpp", engine: "C++ (GCC 9.2.0)" },
  { id: 76, language: "cpp", engine: "C++ (Clang 7.0.1)" },
  { id: 51, language: "csharp", engine: "C# (Mono 6.6.0.161)" },
  { id: 86, language: "clojure", engine: "Clojure (1.10.1)" },
  { id: 77, language: "cobol", engine: "COBOL (GnuCOBOL 2.2)" },
  { id: 55, language: "commonLisp", engine: "Common Lisp (SBCL 2.0.0)" },
  { id: 56, language: "d", engine: "D (DMD 2.089.1)" },
  { id: 58, language: "erlang", engine: "Erlang (OTP 22.2)" },
  { id: 59, language: "fortran", engine: "Fortran (GFortran 9.2.0)" },
  { id: 60, language: "go", engine: "Go (1.13.5)" },
  { id: 88, language: "groovy", engine: "Groovy (3.0.3)" },
  { id: 61, language: "haskell", engine: "Haskell (GHC 8.8.1)" },
  { id: 62, language: "java", engine: "Java (OpenJDK 13.0.1)" },
  { id: 63, language: "javascript", engine: "JavaScript (Node.js 12.14.0)" },
  { id: 78, language: "kotlin", engine: "Kotlin (1.3.70)" },
  { id: 64, language: "lua", engine: "Lua (5.3.5)" },
  { id: 79, language: "objectiveC", engine: "Objective-C (Clang 7.0.1)" },
  { id: 66, language: "octave", engine: "Octave (5.1.0)" },
  { id: 67, language: "pascal", engine: "Pascal (FPC 3.0.4)" },
  { id: 85, language: "perl", engine: "Perl (5.28.1)" },
  { id: 68, language: "php", engine: "PHP (7.4.1)" },
  { id: 71, language: "python", engine: "Python (3.8.1)" },
  { id: 80, language: "r", engine: "R (4.0.0)" },
  { id: 72, language: "ruby", engine: "Ruby (2.7.0)" },
  { id: 73, language: "rust", engine: "Rust (1.40.0)" },
  { id: 81, language: "scala", engine: "Scala (2.13.2)" },
  { id: 82, language: "sql", engine: "SQL (SQLite 3.27.2)" },
  { id: 83, language: "swift", engine: "Swift (5.2.3)" },
  { id: 74, language: "typescript", engine: "TypeScript (3.7.4)" },
] as const

export type SupportedLanguage = typeof supportedLangs[number]

export const supportedLangIds: readonly [string, ...string[]] = [
  supportedLangs[0].id.toString(),
  ...supportedLangs.slice(1).map(lang => lang.id.toString())
] as const
