**GETTING STARTED**
# **REGISTRATION AND SETUP**

---

## **i. WHAT YOU WILL CONFIGURE**

![type:video](./_videos/Registration and Setup [Bob DevOps L3].mp4)
!!! quote ""
    Christopher Bienko *(AI Enablement GTM Product Manager)* provides an overview of the *Registration and Setup* module for the hands-on enablement. **<a href="https://ibm.seismic.com/Link/Content/DChJWBFJ4W2D6GqRbXgPWmdVWDH3" target="_blank">[2 min]</a>**
    
Before beginning [Module 1 | Design](1-1.md){:target="_blank"} of the hands-on lab, three components must first be configured.

!!! quote ""
    1. A **remote Ubuntu server**, reserved through **IBM Technology Zone (ITZ)**.
    2. The **software and tools on your local machine**: Bob IDE, Terraform and Ansible, plus a few standard utilities.
    3. A **working SSH connection** between Bob IDE and the ITZ remote server.

Detailed instructions on how to acquire and configure these components are provided within this hands-on section in the pages below.

---

## **ii. RESERVING THE SERVER**

The first order of business will be booking an Ubuntu server image **via [IBM Technology Zone](https://techzone.ibm.com){:target="_blank"}**, IBM's platform for reserving demo and lab environments. The reservation provisions an Ubuntu server for you and hands you everything needed to reach it: a public IP address and SSH port, along with a username and a private key file.

---

1. Sign in at **[techzone.ibm.com](https://techzone.ibm.com){:target="_blank"}** with your IBMid, then search for the lab environment:

    !!! warning "IBM TECHNOLOGY ZONE COLLECTION"
        **URL: <a href="https://techzone.ibm.com/collection/bob-business-partner-enablement/environments" target="_blank">https://techzone.ibm.com/collection/bob-business-partner-enablement/environments</a>**

        **NAME: `Ubuntu VPC 24-04-04`**

    ![](_attachments/setup-ubuntu-1.png){ width="600" }

---

2. Within the `Ubuntu VPC 24-04-04` tile, hover over the **ibmcloud-2 environment** button and click **Reserve** to launch the reservation configuration tool.

---

3. *Step 1: General* of the configuration process will ask you to specify a **Name** and **Description** for your reservation. When ready, click **Next** in the bottom-right corner to continue.

    ![](_attachments/setup-ubuntu-2.png){ width="600" }

---

4. *Step 2: Business purpose* should be set to **Learning**. When ready, click **Next** to continue.

---

5. *Step 3: Deployment* will ask you to specify the **Geography** for your deployment. Select the data center location that is closest to you. When ready, click **Next** to continue.

    ![](_attachments/setup-ubuntu-4.png){ width="600" }

---

6. *Step 4: Scheduling* will ask you to specify the go-live and termination dates for your entitlement. Choose a window that comfortably covers the time you expect to spend on this lab. If the entitlement lapses before you finish, you can submit a new request using these same instructions. When ready, click **Next** to continue.

    ![](_attachments/setup-ubuntu-5.png){ width="600" }

---

7. *Step 5: Configure* can be left **unmodified**. When ready, click **Next** to continue.

---

8. *Step 6: Review and submit* will ask you to review your configuration settings before submitting the request. Scroll down through your reservation details and, if you approve, check the **I agree to IBM Technology Zone's terms & conditions and user security policies.** box at the bottom of the page. When ready, click **Submit** to initiate the reservation request.

    ![](_attachments/setup-ubuntu-6.png){ width="600" }

---

9. The web browser will redirect automatically to IBM Technology Zone's *My requests* dashboard. From this page, you can monitor and track the progression of your reservation request as it moves from `Scheduled` to `Provisioning` to `Ready`. **Wait** until the request is marked as `Ready` before advancing.

    Average deployment times are roughly **`20 minutes`** or less.

    ![](_attachments/setup-ubuntu-7.png){ width="600" }

    ![](_attachments/setup-ubuntu-8.png){ width="600" }

    ![](_attachments/setup-ubuntu-9.png){ width="600" }

---

10. When the reservation is `Ready`, you will receive an email to your inbox providing you with a link to the environment **and** the same details will also be accessible via the *My requests* dashboard (where you were tracking the reservation request).

    Click either the **View your request** link in the email body *OR* click the arrow to the left of your reservation name on the *My requests* dashboard to expand details about the request.

    ![](_attachments/setup-ubuntu-10.png){ width="600" }

---

11. The environment details page contains everything the lab's environment variables need:

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-02/d447c367-9a25-4d17-ad1d-101fc6599c6d/user_cropped_screenshot_43ca71a642ce40ddb3f1a892f0e8336d_text_export.jpeg" alt="" width="600" />
    </p>

    | Details page shows | You'll use it as |
    |--------------------|------------------|
    | Public IP address | `TARGET_HOST` |
    | SSH port (often non-standard, e.g. `2223`) | `SSH_PORT` |
    | Username (typically `itzuser`) | `SSH_USER` |
    | **Deployment SSH private key** → `ssh_private_key.pem` | `SSH_KEY` |

---

12. On the details page, click **Download** under **Deployment SSH private key**.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-02/14d067c0-cf7d-4f6a-a73f-5735ef01589a/user_cropped_screenshot_8866997a1d354ebfa97b22ad5f719cea_text_export.jpeg" alt="" width="600" />
    </p>

---

13. Click **Show ssh_private_key.pem** to reveal the downloaded file.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-02/3be19ee0-faca-4c09-8c95-3d1b9c81cf9a/user_cropped_screenshot_ec1e8a71bd0741a693941266066622c3_text_export.jpeg" alt="" width="600" />
    </p>

---

14. Move the `.pem` file **into your lab folder**, so that the `SSH_KEY` path used later in the lab can be given as `./ssh_private_key.pem`.

---

15. The lab folder now shows the key alongside the starter files.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-02/95c5d8af-be60-4dfe-b76e-0c0ff62c0544/user_cropped_screenshot_24478fa0509140a0b62fae3a926bafec_text_export.jpeg" alt="" width="600" />
    </p>

    Then lock down its permissions. This `.pem` file is effectively the password to your server, so it should be readable by you and nobody else. SSH enforces this: if the file is readable by other accounts on your laptop, it refuses to use the key and the connection fails with an "UNPROTECTED PRIVATE KEY FILE" warning. The command below makes you the only one who can read or edit it. Run it in the Bob IDE terminal:

    ```bash
    chmod 600 ssh_private_key.pem
    ```

    !!! warning "RESERVATIONS EXPIRE"
        When the reservation ends, the VSI is **deleted** — along with anything deployed on it. That is fine for this lab (the entire stack rebuilds from code), but extend the reservation from the details page if you need the environment longer.

---

## **iii. SOFTWARE CONFIGURATION**

The hands-on lab you are embarking on requires that several open source tools and drivers are available on your personal (local) machine. Many of these have become ubiquitous parts of our day-to-day as technology sellers and practitioners — so it's likely you have some (if not all) of these already configured on your local machine. Ensure that you have *all* of these components configured before advancing to **section iv**. There is a verification and validation step at the end of this section (**iii.**) that you can leverage to sanity-check everything is working before advancing.

---

### **Required software**

You will require the following tools and technologies on your local machine. Instructions on acquiring and configuring each of them are detailed in the pages below.

| Tool | Minimum Version | Purpose | Installation Method |
|------|----------------|---------|---------------------|
| **Bob IDE** | Latest | Infrastructure code generation | Download from IBM |
| **Python** | >= 3.8 | Required for Ansible | System package manager |
| **Terraform** | >= 1.6 | Infrastructure provisioning | See below |
| **Ansible** | >= 2.15 | Configuration management | pip install |
| **SSH Client** | Any | Remote server access | Pre-installed (most systems) |
| **curl** | Any | API testing | Pre-installed (most systems) |
| **GNU make** | Any | Automation scripts | System package manager |

---

### **Installing Terraform**

Follow the instruction set that matches your local machine's operating system.

**macOS (Homebrew):**
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

**Linux (Ubuntu/Debian):**
```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

**Windows (Chocolatey):**
```powershell
choco install terraform
```

**Alternative (Direct Download):**
Download from [terraform.io/downloads](https://www.terraform.io/downloads){:target="_blank"} and add to PATH.

??? warning "TROUBLESHOOTING: `terraform: command not found`"
    **Cause** — Terraform is not installed or not on the `PATH`.

    **Fix:**
    ```bash
    # macOS with Homebrew
    brew install terraform

    # Ubuntu/Debian
    sudo apt-get update
    sudo apt-get install terraform

    # Verify installation
    which terraform
    terraform version
    ```

---

### **Installing Ansible**

Ansible is installed via Python's pip package manager. Use the Bob IDE terminal or your system terminal:

**Install Ansible using pip:**
```bash
# Ensure pip is up to date
python3 -m pip install --upgrade pip

# Install Ansible
python3 -m pip install ansible

# Verify installation
ansible --version
```

**Expected output:**
```
ansible [core 2.15.x]
  config file = None
  configured module search path = [...]
  ansible python module location = [...]
  executable location = /usr/local/bin/ansible
  python version = 3.x.x
```

**Alternative: Install with additional tools:**
```bash
# Install Ansible with commonly used collections
python3 -m pip install ansible ansible-lint
```

??? warning "TROUBLESHOOTING: `pip: command not found`"
    **Cause** — Python 3 / pip is not installed on the laptop.

    **Fix:**
    ```bash
    # macOS
    brew install python3

    # Ubuntu/Debian
    sudo apt-get update
    sudo apt-get install python3 python3-pip

    # Verify
    python3 --version
    python3 -m pip --version
    ```

??? warning "TROUBLESHOOTING: Ansible fails to install, or `ansible: command not found` afterwards"
    **Cause** — a system-wide pip install needs permissions you do not have, or pip's user bin directory is not on your `PATH`.

    **Fix** — install into your user environment and put its bin directory on the PATH:
    ```bash
    python3 -m pip install --user ansible

    # Add to ~/.bashrc or ~/.zshrc
    export PATH="$HOME/.local/bin:$PATH"

    # Reload shell
    source ~/.bashrc  # or source ~/.zshrc
    ```

---

### **Validation and verification checks**

Run these commands in the Bob IDE terminal to verify your setup:

```bash
# Check Python
python3 --version

# Check Terraform
terraform version

# Check Ansible
ansible --version

# Check SSH
ssh -V

# Check curl
curl --version

# Check make
make --version
```

!!! success "EXPECTED RESULTS"
    - All commands return version information — no "command not found" errors
    - Terraform >= 1.6
    - Ansible >= 2.15

---


## **iv. WORKSPACE CONFIGURATION**

!!! warning "DOWNLOAD: Lab source files"
    If you want to maintain a local copy of the original lab's source files on your local machine, you can do so (without a GitHub account) by downloading the following ZIP repository from Seismic.

    **URL: <a href="https://ibm.seismic.com/Link/Content/DChBRPJQVJQTJ8QPbp688qpPHXDd" target="_blank">https://ibm.seismic.com/Link/Content/DChBRPJQVJQTJ8QPbp688qpPHXDd</a>**

The entire hands-on lab you are embarking on runs inside the **Bob IDE**, with the lab folder open as your workspace. You prompt Bob, run commands, and review generated code there. This section (**iv.**) ensures that the Bob IDE **Workspace** is properly configured before you begin.

---

### **Launch Bob IDE**

1. Open your computer's search.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/92ea3bb2-c366-407f-a6d8-dc6f8097ece1/user_cropped_screenshot_50aed8bf63ee4e569a17782f336d704f_text_export.jpeg" alt="" width="600" />
    </p>

---

2. Search for IBM Bob and open it.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/6a39b27c-f79e-4288-b4fb-b33dd3bf6ccf/user_cropped_screenshot_c258a4c577404442aae5b0a4ba363491_text_export.jpeg" alt="" width="600" />
    </p>

---

### **Open the lab folder**

3. On the welcome screen, click **Open** to browse for a workspace folder.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/4fe9b8cc-16ca-4802-a64b-c30f0bcb61d3/user_cropped_screenshot_40b9d7969a6e4ea6a4473ea0fdb7680d_text_export.jpeg" alt="" width="600" />
    </p>

---

4. Navigate to the DevOps-Ansible-and-Terraform folder.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/29b26148-34c1-475a-b3c3-9d9dc9223603/user_cropped_screenshot_23f84e9274cf4d0ab81cdbb1d69393da_text_export.jpeg" alt="" width="600" />
    </p>

---

5. Click **Open**.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/afeaa5f6-c5aa-4c6f-8827-dbc3e0f328d2/user_cropped_screenshot_c176c7e150874590840ae29abbb18801_text_export.jpeg" alt="" width="600" />
    </p>

---

6. Bob IDE asks whether you trust the authors of the folder. It is your own lab folder, so confirm.

    !!! warning "PUT THE LAB FOLDER SOMEWHERE WITH NO SPACES IN THE PATH"
        A folder named `IBM BOB DEV OPS` (or any parent directory with a space) breaks Ansible's INI inventory, which splits host lines on whitespace. The failure is easy to miss: the inventory silently fails to parse, and Ansible falls back to **implicit localhost**. Every task then runs against your laptop instead of the server: templates render into your local `/tmp`, and the playbook appears to hang.

        Use a path like `~/labs/bob-devops` instead. If you must keep a space, every inventory value holding a path has to be double-quoted, and any tool that reads it needs the same care.

        <p align="left">
        <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/cbbb88f8-628c-4c16-9d3d-acb1654da30e/user_cropped_screenshot_ba886ae266a34de68ebc91e83fe2e26a_text_export.jpeg" alt="" width="600" />
        </p>

---

### **Confirm the workspace**

7. The file explorer on the left should now show the three starter files. The folder is intentionally almost empty, since Bob generates everything else during Module 1:

    ```
    LAB/
    ├── README.md
    ├── WORKSHOP-part1-IDE.md
    └── WORKSHOP-part2-CLI.md
    ```

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/342564b4-2cda-49d8-a8bb-b9a526831881/user_cropped_screenshot_f13e60d35e584da5b44b57ab8d56a30d_text_export.jpeg" alt="" width="600" />
    </p>

---

### **Open the integrated terminal**

8. From the menu bar, click **Terminal → New Terminal** (or press ++ctrl+grave++ / ++cmd+grave++).

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/2bbab782-9401-44cd-a5ba-ae57ce01d86a/user_cropped_screenshot_a63fac70953947608efe67c2a2152005_text_export.jpeg" alt="" width="600" />
    </p>

---

9. A terminal panel opens at the bottom, already inside the lab folder.

    Every command in this guide runs in this terminal, from the installs and environment variables to the SSH tests. That way it inherits the folder and the variables that Bob works with.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/6bb2db70-753c-4c7b-a0cb-11ecbfbaf401/user_cropped_screenshot_9ff8033a2dff481396b2ee97c1979b50_text_export.jpeg" alt="" width="600" />
    </p>

---

### **Check the Bob settings**

Open Bob's chat sidebar and set it up the way the lab expects before you prompt anything:

10. **Switch Bob to Plan mode.** Module 1 starts in Plan mode. Bob proposes the design first, and you switch to Agent mode only when it is time to write files, so nothing is created until you have reviewed the plan.

    1. At the bottom right of the screen, locate the agent selection.

        <p align="left">
        <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/a384c78b-9885-44a0-96f1-3aa14d237df3/user_cropped_screenshot_b89d48e071454a10ba8f417710ce5b60_text_export.jpeg" alt="" width="600" />
        </p>

    2. Bob is now in Plan mode.

        <p align="left">
        <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/bce0ea0a-0d16-45dc-8440-10c309c94864/user_cropped_screenshot_b960b59b492b47b99b854599f3833c1a_text_export.jpeg" alt="" width="600" />
        </p>

---

11. **Leave any auto-approve / autonomous-agent toggle off.** Bob IDE offers a mode in which Bob applies changes or runs commands without asking. Keep it disabled for this lab.

---

12. **Find the "sparkle" icon (prompt enhancement).** It sits on the chat box at the bottom right and needs no configuration at this stage. Module 1 uses it to expand a short prompt into a detailed one before sending.

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-01/097138a5-5ccc-492b-80c4-f0b654e341a7/user_cropped_screenshot_6061087d837c408b9dfcc4f097ea922f_text_export.jpeg" alt="" width="600" />
    </p>

    ??? warning "TROUBLESHOOTING: No "sparkle" icon within the chat box"
        Prompt enhancement is turned off. Enable it:

        <p align="left">
        <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/7578a9ee-9b0f-4a46-ae42-b0d7cfb4485b/user_cropped_screenshot_077c473abdda4e32b04a7d14629ab256_text_export.jpeg" alt="" width="600" />
        </p>

        1. At the bottom right of the screen, click Bob settings.

            <p align="left">
            <img src="https://colony-recorder.s3.amazonaws.com/files/2026-07-31/799e5c6a-3044-4ead-8ac7-b4fd72d80996/user_cropped_screenshot_d082ced6e36b491a9e56962f8f7596cd_text_export.jpeg" alt="" width="600" />
            </p>

        2. Click the **Chat** section on the settings page.

            <p align="left">
            <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-01/423dc9f0-5308-4e75-8b60-a7f11b4e559c/user_cropped_screenshot_63961b96ccf741f3a80743f7beb9089b_text_export.jpeg" alt="" width="600" />
            </p>

        3. Scroll to the bottom of the page and locate the **Prompt enhancement** section.

            <p align="left">
            <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-01/0d30431a-4b21-4bee-bb82-cbd6138da0b4/user_cropped_screenshot_c5188d015d8943e89384c5eba4315d62_text_export.jpeg" alt="" width="600" />
            </p>

        4. Turn on **Prompt enhancement**.

            <p align="left">
            <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-01/8c99b4cf-9b9f-4f6d-a368-cd1b850925d0/user_cropped_screenshot_5a8da212c707470d98e3ecafc28c06ce_text_export.jpeg" alt="" width="600" />
            </p>

        The sparkle icon now shows on the chat box.

---


## **v. CONNECTING TO THE SERVER**

!!! info "ATTENTION: WAIT UNTIL RESERVATION IS MARKED `READY`"
    Before attempting this section (**v.**), **wait** until you receive confirmation from IBM Technology Zone that your requested environment is `READY`. This will arrive both as an email to your inbox and as a status update on ITZ's *My requests* dashboard.

With your local machine properly configured with the necessary tools and the Bob IDE Workspace prepared, it's now time to establish a connection between Bob IDE (locally) and the server reservation placed earlier from IBM Technology Zone (remotely).

---

### **Set environment variables**

1. Before running any commands, have these five values in front of you. The first four come from the environment details page you opened earlier (or your own server's equivalents):

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-02/d447c367-9a25-4d17-ad1d-101fc6599c6d/user_cropped_screenshot_43ca71a642ce40ddb3f1a892f0e8336d_text_export.jpeg" alt="" width="600" />
    </p>

    - **Public IP address** — of the server.
    - **SSH username** — Technology Zone reservations typically use `itzuser`.
    - **SSH port** — often non-standard on Technology Zone (e.g. `2223`); usually `22` on other servers.
    - **Path to the downloaded SSH key file** — `./ssh_private_key.pem`, since you moved it into the lab folder earlier.
    - **A Grafana admin password** — this one you invent yourself. Pick something strong; it becomes your Grafana login later in the lab.

---

2. Paste each value into its command below, then **run them in the Bob IDE terminal:**

    ```bash
    export TARGET_HOST=[paste public IP here]
    export SSH_USER=[paste SSH username here]
    export SSH_PORT=[paste SSH port here]
    export SSH_KEY=[paste path to SSH key file here]
    export TF_VAR_grafana_admin_password='[type your chosen Grafana password here]'
    ```

    ??? info "NOT SURE YOU FILLED THEM IN CORRECTLY? A COMPLETED SET LOOKS LIKE THIS"
        These are sample values from an expired reservation — **do not copy them**, as they will not work. They are here only so you can compare the *shape* of your values:

        ```bash
        export TARGET_HOST=150.240.70.220
        export SSH_USER=itzuser
        export SSH_PORT=2223
        export SSH_KEY=./ssh_private_key.pem
        export TF_VAR_grafana_admin_password='Workshop!2026'
        ```

---

### **Test SSH connectivity**

3. Verify you can connect to the remote server with passwordless `sudo`:

    ```bash
    ssh -i "$SSH_KEY" -p $SSH_PORT ${SSH_USER}@${TARGET_HOST} 'sudo -n true && echo ok'
    ```

    **Expected output:** `ok`

    <p align="left">
    <img src="https://colony-recorder.s3.amazonaws.com/files/2026-08-02/f015baab-415b-4fcc-a431-1c71c80349d0/user_cropped_screenshot_d6e3cd77912c450b883037b4c6e70da7_text_export.jpeg" alt="" width="600" />
    </p>

    !!! failure ""
        **If this fails, review:**

        - SSH key permissions are `600`
        - SSH key is authorized on the remote server
        - User has passwordless sudo configured
        - Firewall allows SSH on the specified port

    ??? warning "TROUBLESHOOTING: `Permission denied (publickey)`"
        **Cause**: the key file is either too permissive (SSH refuses loose keys) or not the key the server expects.

        **Fix:**
        ```bash
        # Verify key permissions, must show -rw------- (600)
        ls -la "$SSH_KEY"
        chmod 600 "$SSH_KEY"

        # Verify the key is a private key at all
        head -1 "$SSH_KEY"
        # Should start with: -----BEGIN RSA PRIVATE KEY----- or similar
        ```

    ??? warning "TROUBLESHOOTING: cannot reach the remote server over SSH"
        **Cause** — wrong host/port, the reservation is not Ready yet, or a network path problem.

        **Fix** — narrow it down layer by layer:
        ```bash
        # Test basic connectivity
        ping $TARGET_HOST

        # Test the SSH port specifically
        nc -zv $TARGET_HOST $SSH_PORT

        # Verbose SSH connection — read the last lines before the failure
        ssh -v -i "$SSH_KEY" -p $SSH_PORT ${SSH_USER}@${TARGET_HOST}
        ```

    ??? warning "TROUBLESHOOTING: `sudo -n true` asks for a password"
        **Cause** — the SSH user does not have passwordless sudo. (The Technology Zone VSI comes with it preconfigured — this mainly affects bring-your-own servers.)

        **Fix** — configure it on the remote server:
        ```bash
        # On the remote server:
        echo "${SSH_USER} ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/${SSH_USER}
        ```

---

## **vi. TROUBLESHOOTING**

If you encounter issues during setup:

1. Expand the **Troubleshooting** dropdowns under the step you are stuck on. Each known failure and its fix sits directly beneath the instruction that triggers it.
2. Check the [Reference Documentation](architecture.md){:target="_blank"}.
3. Verify all environment variables are set correctly.
4. Ensure SSH connectivity before proceeding.
5. Confirm all tools are installed and in PATH.

- [Terraform Documentation](https://www.terraform.io/docs){:target="_blank"}
- [Ansible Documentation](https://docs.ansible.com/){:target="_blank"}
- [SSH Tunneling Guide](https://www.ssh.com/academy/ssh/tunneling){:target="_blank"}
- [Rancher Desktop documentation](https://docs.rancherdesktop.io/){:target="_blank"} — the reference for the engine itself: installing it, running it headless, and its VM settings
- [Python pip Documentation](https://pip.pypa.io/en/stable/){:target="_blank"}

---

## **vii. READY TO PROCEED**

Setup is complete. Bob IDE is open on the lab folder with the tools installed, the server is reserved, and the SSH connection is verified. You are ready to begin the hands-on work and watch Bob design and build infrastructure as it would within a client's real project.

Before proceeding to [Module 1 | Design](1-1.md){:target="_blank"}, verify all items below:

!!! success ""
    - Technology Zone reservation in **Ready** status
    - SSH key (`.pem`) downloaded from the reservation page
    - Bob IDE installed and authenticated
    - Lab folder opened in Bob IDE
    - Terminal accessible in Bob IDE
    - Python >= 3.8 installed
    - Terraform >= 1.6 installed
    - Ansible >= 2.15 installed (via pip)
    - SSH client available
    - Environment variables configured in terminal
    - SSH key has correct permissions (chmod 600)
    - SSH connectivity to remote server verified
    - `TF_VAR_grafana_admin_password` set

Proceed to [Module 1 | Design](1-1.md){:target="_blank"}, where you hand Bob a one-paragraph requirement and review the architecture it proposes.

---