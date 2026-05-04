/**
 * @fileoverview CIPHER DECODE — Efeito de Descriptografia em Scroll
 *
 * Qualquer elemento com o atributo `data-cipher` começa com texto
 * embaralhado em caracteres especiais. Quando o elemento entra na
 * viewport (threshold: 30%), um efeito de decodificação é executado:
 * os caracteres aleatórios vão sendo substituídos pelo texto real,
 * da esquerda pra direita, em ondas progressivas.
 *
 * Parece aquelas cenas de hacking nos filmes — só que bonito.
 *
 * @example
 * <!-- No HTML, use o atributo data-cipher em qualquer elemento: -->
 * <span data-cipher>TEXTO SECRETO</span>
 *
 * @module CipherDecode
 */

/**
 * Módulo IIFE do Cipher Decode.
 * @namespace CipherDecode
 */
const CipherDecode = (() => {

    /**
     * Conjunto de caracteres usados no embaralhamento.
     * Mix de maiúsculas, minúsculas, números e símbolos especiais
     * pra parecer realmente como "dados corrompidos".
     * @type {string}
     */
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]=/\\|~^';

    /**
     * Número de passos de embaralhamento antes de revelar o caractere correto.
     * Quanto maior, mais tempo fica "codificado" antes de resolver.
     * @type {number}
     */
    const ITERATIONS = 8;

    /**
     * Velocidade entre cada passo de decodificação (ms).
     * 30ms = ~33 atualizações por segundo.
     * @type {number}
     */
    const SPEED = 30;

    /**
     * Inicializa o efeito em todos os elementos com `data-cipher`.
     *
     * Usa IntersectionObserver pra disparar a decodificação
     * somente quando o elemento entra na viewport.
     * O atributo `data-cipher-done` evita que rode mais de uma vez.
     */
    function init() {
        const targets = document.querySelectorAll('[data-cipher]');
        if (!targets.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.cipherDone) {
                    entry.target.dataset.cipherDone = 'true'; // Marca como executado
                    decode(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -60px 0px', // Espera 60px antes do final da viewport
        });

        targets.forEach(el => {
            // Salva o texto original e já exibe embaralhado
            el.dataset.cipherOriginal = el.textContent;
            el.textContent = scramble(el.textContent);
            el.style.opacity = '1';
            observer.observe(el);
        });
    }

    /**
     * Embaralha um texto substituindo cada caractere por um aleatório.
     * Espaços e quebras de linha são preservados pra manter o layout.
     *
     * @param   {string} text - Texto original a ser embaralhado
     * @returns {string}      - Texto com caracteres aleatórios
     */
    function scramble(text) {
        return text.split('').map(c => {
            if (c === ' ' || c === '\n') return c; // Preserva espaços
            return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
    }

    /**
     * Executa a animação de decodificação num elemento.
     *
     * A cada iteração, uma porção maior do texto original
     * é revelada (da esquerda pra direita), enquanto o restante
     * continua se embaralhando — criando o efeito de "onda de decodificação".
     *
     * @param {HTMLElement} el - Elemento com o texto a ser decodificado
     */
    function decode(el) {
        const original = el.dataset.cipherOriginal;
        const length = original.length;
        let iteration = 0;

        const interval = setInterval(() => {
            el.textContent = original.split('').map((char, i) => {
                if (char === ' ' || char === '\n') return char;

                // Caracteres antes da "frente de onda" já estão resolvidos
                if (i < Math.floor((iteration / ITERATIONS) * length)) {
                    return char; // Caractere correto — já decodificado
                }

                // Ainda dentro da zona embaralhada
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            iteration++;

            // Quando todas as iterações terminam, garante o texto final limpo
            if (iteration >= ITERATIONS) {
                clearInterval(interval);
                el.textContent = original;
            }
        }, SPEED);
    }

    // API pública
    return { init };
})();
