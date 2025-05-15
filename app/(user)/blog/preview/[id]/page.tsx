export default function PreviewBlogPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-red-300">
      <div className="bg-white p-10">
        <div>PreviewBlogPage</div>
        <label htmlFor="">Masukkan Gambar</label>
        <input type="file" accept="image/*" />

        <label htmlFor="">Masukkan Judul</label>
      </div>
    </div>
  );
}
