interface Window {
  okxwallet:
    | {
        nostr: {
          connect: () => Promise<void>
          selectedAccount: {
            address: string
            publicKey: string
          }
          nip04: {
            encrypt: (publicKey: string, message: string) => Promise<string>
          }
        }
      }
    | undefined
}
