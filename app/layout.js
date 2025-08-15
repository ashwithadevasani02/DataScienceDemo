import './globals.css'
export const metadata = {
  title: 'Data Science Club Website',
  description: 'Official website for the Data Science Club featuring events, and more.',
  icons: {
    icon: '/data.jpg'
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {children}
      </body>
    </html>
  )
} 