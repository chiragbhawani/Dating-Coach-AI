export default function UpgradePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold">Upgrade to Pro</h1>

      <p className="mt-4 text-lg">
        Get unlimited AI coaching, personalized support, and future premium
        features.
      </p>

      <div className="mt-10 rounded-xl border p-6">
        <h2 className="text-2xl font-semibold">Pro Plan</h2>

        <p className="mt-2 text-3xl font-bold">
          ₹249<span className="text-base font-normal">/month</span>
        </p>

        <ul className="mt-6 space-y-2">
          <li>✓ Unlimited AI messages</li>
          <li>✓ Personalized AI experience</li>
          <li>✓ Future conversation memory</li>
        </ul>

        <div className="mt-8">
          <p className="font-semibold">Pay via UPI</p>

          <p className="mt-2">
            UPI ID: YOURUPI@bank
          </p>

          <p className="mt-4 text-sm">
            After payment, email the screenshot and your account email to:
          </p>

          <p className="font-medium">
            support@yourdomain.com
          </p>
        </div>
      </div>
    </main>
  );
}