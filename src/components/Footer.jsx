export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-gray-200 py-4 mt-6">
            <div className="max-w-3xl mx-auto text-center text-sm">
                문의 사항은{" "}
                <a
                    href="https://antenna-gossip-divx-ol.trycloudflare.com/board"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    여기를 클릭
                </a>
            </div>
        </footer>
    );
}
