import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p>404 / PAGE INTROUVABLE</p><h1>ON S’EST<br />PERDUS.</h1><Link href="/">← RETOUR À L’ACCUEIL</Link></main>;
}
